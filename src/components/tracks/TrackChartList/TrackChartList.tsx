"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import api from "@/api/api";
import TrackList from "../TrackList/TrackList";

const TRACKS_PER_PAGE = 10;
const MAX_TRACKS = 50;

export default function TrackChartList() {
  const { ref, inView } = useInView({
    threshold: 0,
  });

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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error loading tracks</div>;

  return (
    <div>
      <section>
        <div className="mx-8 mt-16 p-6 border-dashed border border-purple-600 rounded-lg">
          <ul>
            {data?.pages.flatMap((page, pageIndex) =>
              page.tracks.map((track, index) => <TrackList key={track.id} track={track} TRACKS_PER_PAGE={TRACKS_PER_PAGE} index={index} pageIndex={pageIndex} />),
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
