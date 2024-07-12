import api from "@/api/api";
import TrackChartList from "@/components/tracks/TrackList/TrackList";
import { Suspense } from "react";

export default async function ChartPage() {
  const initialData = await api.spotify.getChartTracks(0, 10);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackChartList initialData={initialData} />
    </Suspense>
  );
}
