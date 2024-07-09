"use client";

import Image from "next/image";
import fakeData from "../(tracks)/_data/data.json";

function MainPage() {
  const tracks = fakeData.tracks;

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 min-h-[calc(100vh-200px)] p-6">
        <section>
          <h2 className="font-bold text-3xl px-2 mb-4">인기순</h2>
          <div className="flex">
            {tracks.slice(0, 3).map((track, index) => (
              <div key={index} className="w-1/3 flex flex-col">
                <Image src={track.album.images[0].url} alt={track.name} width={200} height={200} />
                <h3 className="py-1.5">{track.name}</h3>
                <p>{track.artists.map(artist => artist.name).join(", ")}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <div className="p-10">
            {tracks.map((track, index) => (
              <div key={index} className="flex items-center gap-2 py-2">
                <span className="mr-2.5">{index + 1}</span>
                <Image src={track.album.images[2].url} alt={`${track.name} album cover`} width={64} height={64} />
                <div>
                  <p>{track.name}</p>
                  <p className="font-light text-md">{track.artists.map(artist => artist.name).join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MainPage;
