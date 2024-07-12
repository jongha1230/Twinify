export const dynamic = "force-dynamic";

import LikedTracksList from "@/components/tracks/LikesTrackList/LikesTrackList";
import { Suspense } from "react";

export default async function LikesListPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LikedTracksList />
      </Suspense>
    </div>
  );
}
