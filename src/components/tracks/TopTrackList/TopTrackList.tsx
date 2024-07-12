import { useLikes } from "@/lib/hooks/useLikes";
import { formatDuration } from "@/lib/utils/formatDuration";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import Link from "next/link";
import TrackList from "../TrackList";

interface TrackListProps {
  tracks: SpotifyApi.TrackObjectFull[];
}

export default function TopTrackList({ tracks }: TrackListProps) {

  return (
    <section>
      <div className="mx-8 mt-16 p-6 border-dashed border border-purple-600 rounded-lg">
        <ul>
          {tracks.map((track, index) => (
            <Link href={`track/${track.id}`} key={track.id}>
              <TrackList track={track} index={index} />
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
}
