import api from "@/api/api";
import TracksList from "@/components/tracks/TrackList_t/TrackList";
import { Suspense } from "react";

export default async function ChartPage() {
  const initialData = await api.spotify.getChartTracks(0, 10);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TracksList initialData={initialData} />
    </Suspense>
  );
}
