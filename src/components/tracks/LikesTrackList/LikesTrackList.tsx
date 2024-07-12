"use client";

import { useLikedTracks } from "@/lib/hooks/useLikedTracks";
import { useLikes } from "@/lib/hooks/useLikes";
import { formatDuration } from "@/lib/utils/formatDuration";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export interface LikedTracksListProps {
  initialTracks: SpotifyApi.TrackObjectFull[];
  totalLikes: number;
  userId: string;
}

export default function LikedTracksList() {
  const { user } = useAuthStore();
  const router = useRouter();
  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      router.push("/login");
    }
  }, [userId, router]);

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useLikedTracks(userId);
  const { likes, addLike, removeLike } = useLikes(userId);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

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
    router.push("/mypage");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data || !likes) return <div>No data available.</div>;

  return (
    <section>
      <div className="mx-8 mt-16 p-6 border-dashed border border-purple-600 rounded-lg">
        <ul>
          {data?.pages.flatMap((page, pageIndex) =>
            page.tracks?.map((track, index) => (
              <Link href={`track/${track.id}`} key={track.id}>
                <li key={track.id} className={`px-8 py-3 flex items-center space-x-4 cursor-pointer hover:bg-gray-900`}>
                  <span>{pageIndex * 10 + index + 1}</span>
                  <Image src={track.album.images[2].url} alt={`${track.name} album cover`} width={52} height={52} />
                  <div className="flex flex-col flex-grow max-w-40">
                    <span className="font-semibold text-lg ">{track.name}</span>
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
              </Link>
            )),
          )}
        </ul>
        {hasNextPage && <div ref={ref}>Loading more...</div>}
      </div>
    </section>
  );
}
