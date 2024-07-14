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
            <TrackList key={track.id} track={track} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
