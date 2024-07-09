"use client";

import { formatDuration } from "@/lib/utils/formatDuration";
import Image from "next/image";
import { useState } from "react";
import fakeData from "./(tracks)/_data/data.json";

function MainPage() {
  const tracks = fakeData.tracks;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [likedTracks, setLikedTracks] = useState<string[]>([]);

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleHeartClick = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setLikedTracks(prevLikedTracks => (prevLikedTracks.includes(id) ? prevLikedTracks.filter(trackId => trackId !== id) : [...prevLikedTracks, id]));
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 min-h-[calc(100vh-200px)] p-6">
        <section>
          <h2 className="font-bold text-3xl px-16 my-10">인기순</h2>
          <div className="flex justify-center items-center gap-32">
            {tracks.slice(0, 3).map((track, index) => (
              <div key={index} className="flex flex-col">
                <Image src={track.album.images[0].url} alt={track.name} width={200} height={200} />
                <h3 className="py-1.5">{track.name}</h3>
                <p>{track.artists.map(artist => artist.name).join(", ")}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <div className="mx-8 mt-16 p-6 border-dashed border border-purple-600 rounded-lg">
            <ul>
              {tracks.map((track, index) => (
                <li key={track.id} className={`px-8 py-3 flex items-center space-x-4 cursor-pointer ${selectedIndex === index ? "bg-gray-900" : ""}`} onClick={() => handleItemClick(index)}>
                  <span>{index + 1}</span>
                  <Image src={track.album.images[2].url} alt={`${track.name} album cover`} width={52} height={52} />
                  <div className="flex flex-col flex-grow max-w-40">
                    <span className="font-semibold text-lg text-nowrap">{track.name}</span>
                    <span className="text-sidebarSubtitle">{track.artists.map(artist => artist.name).join(", ")}</span>
                  </div>
                  <span className="flex flex-col flex-grow items-center pr-20">{track.name}</span>
                  <div className="ml-auto">
                    <span className="cursor-pointer pr-4" onClick={e => handleHeartClick(track.id, e)}>
                      {likedTracks.includes(track.id) ? "❤️" : "🤍"}
                    </span>
                    <span>{formatDuration(track.duration_ms)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MainPage;
