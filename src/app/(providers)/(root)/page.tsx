export const revalidate = 3600;

import api from "@/api/api";
import TopTrackList from "@/components/tracks/TopTrackList";
import TopTracks from "@/components/tracks/TopTracks";

export default async function MainPage() {
  const { tracks } = await api.spotify.getTopChartTracks();

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 min-h-[calc(100vh-200px)] p-6">
        <TopTracks tracks={tracks?.slice(0, 3)} />
        <TopTrackList tracks={tracks} />
      </div>
    </div>
  );
}
