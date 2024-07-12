export const dynamic = "force-dynamic";

import api from "@/api/api";
import LikedTracksList from "@/components/tracks/LikesTrackList/LikesTrackList";
import { Suspense } from "react";

async function fetchLikedTracks(userId: string, offset = 0, limit = 10) {
  const likes = await api.likes.getUserLikes(userId);

  const trackIds = likes.slice(offset, offset + limit).map(like => like.trackId);
  const tracks = (await api.spotify.getTrackDetails(trackIds)) as SpotifyApi.TrackObjectFull[];
  return { tracks, totalLikes: likes.length };
}

export default async function LikesListPage() {
  const userId = "dffa9039-784d-43dd-9d87-7537bf605b78";
  const initialData = await fetchLikedTracks(userId);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LikedTracksList initialTracks={initialData.tracks} totalLikes={initialData.totalLikes} userId={userId} />
      </Suspense>
    </div>
  );
}
