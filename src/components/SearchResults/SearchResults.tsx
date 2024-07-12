"use client";

import { useLikes } from "@/lib/hooks/useLikes";
import { useSearchTracks } from "@/lib/hooks/useSearch";
import { formatDuration } from "@/lib/utils/formatDuration";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const TRACKS_PER_PAGE = 10; // 페이지당 트랙 수

export default function SearchResults({ query }: { query: string }) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useSearchTracks(query);
  const { ref, inView } = useInView();
  const { user } = useAuthStore();
  const userId = user?.id;
  const { likes, addLike, removeLike } = useLikes(userId);

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
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while searching</div>;

  return (
    <div className="mx-8 mt-16 p-6 border-dashed border border-purple-600 rounded-lg">
      <ul>
        {data?.pages.flatMap((page, pageIndex) =>
          page.tracks.map((track, index) => (
            <li key={track.id} className={`px-8 py-3 flex items-center space-x-4 cursor-pointer hover:bg-gray-900`}>
              <span>{pageIndex * TRACKS_PER_PAGE + index + 1}</span>
              <Image src={track.album.images[2].url} alt={`${track.name} album cover`} width={52} height={52} />
              <div className="flex flex-col flex-grow max-w-40">
                <span className="font-semibold text-lg">{track.name}</span>
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
          )),
        )}
      </ul>
      <div ref={ref}>{hasNextPage ? "Loading more..." : "No more results"}</div>
    </div>
  );
}
