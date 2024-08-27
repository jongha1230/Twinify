import Image from "next/image";
import Link from "next/link";

interface TopTracksProps {
  tracks: SpotifyApi.TrackObjectFull[];
}

export default function TopTracks({ tracks }: TopTracksProps) {
  return (
    <section>
      <h2 className="font-bold text-3xl px-16 my-10">인기순</h2>
      <div className="flex justify-center items-center gap-32">
        {tracks &&
          tracks.map((track, index) => (
            <Link href={`track/${track.id}`} key={track.id}>
              <div className="flex flex-col">
                <Image src={track.album.images[0].url} alt={track.name} width={200} height={200} />
                <h3 className="py-1.5">{track.name}</h3>
                <p>{track.artists.map(artist => artist.name).join(", ")}</p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
