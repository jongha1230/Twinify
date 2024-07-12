"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import api from "@/api/api";
import { useLikes } from "@/lib/hooks/useLikes";
import { formatDuration } from "@/lib/utils/formatDuration";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import Link from "next/link";

const TRACKS_PER_PAGE = 10;
const MAX_TRACKS = 50;

export default function TrackChartList() {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { user } = useAuthStore();
  const userId = user?.id;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["chartTracks"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await api.spotify.getChartTracks(pageParam, TRACKS_PER_PAGE);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedTracks = allPages.reduce((total, page) => total + page.tracks.length, 0);
      return loadedTracks < MAX_TRACKS ? lastPage.nextOffset : undefined;
    },
    initialPageParam: 0,
  });

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

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error loading tracks</div>;

  return (
    <div>
      <section>
        <div className="mx-8 mt-16 p-6 border-dashed border border-purple-600 rounded-lg">
          <ul>
            {data?.pages.flatMap((page, pageIndex) =>
              page.tracks.map((track, index) => (
                <Link href={`track/${track.id}`} key={track.id}>
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
                </Link>
              )),
            )}
          </ul>
          <div ref={ref} className="text-center">
            {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "모든 트랙을 불러왔습니다"}
          </div>
        </div>
      </section>
    </div>
  );
}
