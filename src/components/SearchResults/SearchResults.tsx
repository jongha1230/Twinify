"use client";

import { useLikes } from "@/lib/hooks/useLikes";
import { useSearchTracks } from "@/lib/hooks/useSearch";
import { formatDuration } from "@/lib/utils/formatDuration";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import TrackList from "../tracks/TrackList";
import Link from "next/link";

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
        {data?.pages.flatMap((page, pageIndex) =>
          page.tracks.map((track, index) => (
            <Link href={`track/${track.id}`} key={track.id}>
              <TrackList track={track} index={index} pageIndex={pageIndex} TRACKS_PER_PAGE={TRACKS_PER_PAGE} />
            </Link>
          )),
        )}
      </ul>
      <div ref={ref}>{hasNextPage ? "Loading more..." : "No more results"}</div>
    </div>
  );
}
