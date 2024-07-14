"use client";

import { useSearchTracks } from "@/lib/hooks/useSearch";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import TrackList from "../tracks/TrackList";

const TRACKS_PER_PAGE = 10; // 페이지당 트랙 수

export default function SearchResults({ query }: { query: string }) {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useSearchTracks(query);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while searching</div>;

  return (
    <div className="mx-8 mt-16 p-6 border-dashed border border-purple-600 rounded-lg">
      <ul>
        {data?.pages.flatMap((page, pageIndex) => page.tracks.map((track, index) => <TrackList key={track.id} track={track} index={index} pageIndex={pageIndex} TRACKS_PER_PAGE={TRACKS_PER_PAGE} />))}
      </ul>
      <div ref={ref}>{hasNextPage ? "Loading more..." : "No more results"}</div>
    </div>
  );
}
