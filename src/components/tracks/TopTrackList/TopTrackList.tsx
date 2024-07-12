"use client";

import { useLikes } from "@/lib/hooks/useLikes";
import { formatDuration } from "@/lib/utils/formatDuration";
import Image from "next/image";

interface TrackListProps {
  tracks: SpotifyApi.TrackObjectFull[];
}

export default function TopTrackList({ tracks }: TrackListProps) {
  const userId = "e6427ef9-aeca-4383-a390-571d968bff1f";
  const { likes, isLoading, error, addLike, removeLike } = useLikes(userId);

  const isLiked = (trackId: string): boolean => {
    if (!Array.isArray(likes)) return false;
    return likes.some(like => like.trackId === trackId);
  };

  const handleHeartClick = (trackId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (isLiked(trackId)) {
      removeLike(trackId);
    } else {
      addLike(trackId);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section>
      <div className="mx-8 mt-16 p-6 border-dashed border border-purple-600 rounded-lg">
        <ul>
          {tracks.map((track, index) => (
            <li key={track.id} className={`px-8 py-3 flex items-center space-x-4 cursor-pointer hover:bg-gray-900`}>
              <span>{index + 1}</span>
              <Image src={track.album.images[2].url} alt={`${track.name} album cover`} width={52} height={52} />
              <div className="flex flex-col flex-grow max-w-40">
                <span className="font-semibold text-lg text-nowrap">{track.name}</span>
                <span className="text-sidebarSubtitle">{track.artists.map(artist => artist.name).join(", ")}</span>
              </div>
              <span className="flex flex-col flex-grow items-center pr-20">{track.name}</span>
              <div className="ml-auto">
                <span className="cursor-pointer pr-4" onClick={e => handleHeartClick(track.id, e)}>
                  {isLiked(track.id) ? "❤️" : "🤍"}
                </span>
                <span>{formatDuration(track.duration_ms)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}