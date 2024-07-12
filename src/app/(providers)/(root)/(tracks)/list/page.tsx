
import TrackChartList from "@/components/tracks/TrackChartList";
import { Suspense } from "react";

export default async function ChartPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackChartList />
    </Suspense>
  );
}
