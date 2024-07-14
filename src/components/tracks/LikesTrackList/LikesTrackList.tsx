"use client";

import { useLikedTracks } from "@/lib/hooks/useLikedTracks";
import { useLikes } from "@/lib/hooks/useLikes";
import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";
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

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useLikedTracks(userId);
  const { likes } = useLikes(userId);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

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
                <TrackList track={track} index={index} TRACKS_PER_PAGE={10} pageIndex={pageIndex} />
              </Link>
            )),
          )}
        </ul>
        {hasNextPage && <div ref={ref}>Loading more...</div>}
      </div>
    </section>
  );
}
