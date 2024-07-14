"use client";

import { useLikes } from "@/lib/hooks/useLikes";
import { formatDuration } from "@/lib/utils/formatDuration";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";

function TrackList({ track, pageIndex, TRACKS_PER_PAGE, index }: { track: SpotifyApi.TrackObjectFull; index: number; pageIndex?: number; TRACKS_PER_PAGE?: number }) {
  const { user } = useAuthStore();
  const userId = user?.id;

  const { likes, addLike, removeLike } = useLikes(userId);
  const isLiked = (trackId: string): boolean => {
    if (!Array.isArray(likes)) return false;
    return likes.some(like => like.trackId === trackId);
  };

  const handleHeartClick = (trackId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (isLiked(trackId)) {
      removeLike(trackId);
    } else {
      addLike(trackId);
    }
  };
  return (
    <li key={track.id} className={`px-8 py-3 flex items-center space-x-4 cursor-pointer hover:bg-gray-900`}>
      <span>{pageIndex !== undefined && TRACKS_PER_PAGE !== undefined ? pageIndex * TRACKS_PER_PAGE + index + 1 : index + 1}</span>
      <Image src={track.album.images[2].url} alt={`${track.name} album cover`} width={52} height={52} />
      <div className="flex flex-col flex-grow max-w-40">
        <span className="font-semibold text-lg">{track.name}</span>
        <span className="text-sidebarSubtitle">{track.artists.map(artist => artist.name).join(", ")}</span>
      </div>
      <span className="flex flex-col flex-grow items-center pr-20">{track.name}</span>
      <div className="flex flex-nowrap ml-auto">
        <span className="cursor-pointer pr-4 transition-transform duration-300 ease-in-out hover:scale-110" onClick={e => handleHeartClick(track.id, e)}>
          {isLiked(track.id) ? "❤️" : "🤍"}
        </span>
        <span>{formatDuration(track.duration_ms)}</span>
      </div>
    </li>
  );
}

export default TrackList;
