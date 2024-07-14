"use client";

import { useLikedTracks } from "@/lib/hooks/useLikedTracks";
import { useLikes } from "@/lib/hooks/useLikes";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import TrackList from "../TrackList";

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

  const { likes } = useLikes(userId);
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useLikedTracks(userId, likes);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (!likes) {
    return <div>좋아요 목록이 없습니다.</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data || !likes) return <div>No data available.</div>;

  return (
    <section>
      <div className="mx-8 mt-16 p-6 border-dashed border border-purple-600 rounded-lg">
        <ul>{data?.pages.flatMap((page, pageIndex) => page.tracks?.map((track, index) => <TrackList key={track.id} track={track} index={index} TRACKS_PER_PAGE={10} pageIndex={pageIndex} />))}</ul>
        {hasNextPage && <div ref={ref}>Loading more...</div>}
      </div>
    </section>
  );
}
