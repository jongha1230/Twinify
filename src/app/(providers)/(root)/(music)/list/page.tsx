"use client";

import { formatDuration } from "@/lib/utils/formatDuration";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import fakeData from "../../(tracks)/_data/data.json";

async function getAccessToken() {
  try {
    const res = await fetch("http://localhost:3000/api/auth/token");
    if (!res.ok) {
      throw new Error("Failed to get access token");
    }
    const data = await res.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
}

async function fetchTracks(pageParam: number) {
  try {
    const access_token = await getAccessToken();
    const res = await fetch(`http://localhost:3000/api/spotify/popular?offset=${pageParam}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to fetch tracks: ${errorMessage}`);
    }

    const data = await res.json();
    return data.tracks || [];
  } catch (error) {
    console.error("Error fetching tracks:", error);
    throw error;
  }
}


function ListPage() {
  const [tracks, setTracks] = useState(fakeData.tracks.slice(0, 4));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [likedTracks, setLikedTracks] = useState<string[]>([]);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !loading && !error) {
      setLoading(true);
      fetchTracks(page * 4).then((newTracks) => {
        setTracks((prevTracks) => [...prevTracks, ...newTracks]);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      }).catch((error) => {
        setError(error.message);
        setLoading(false);
      });
    }
  }, [inView, loading, page, error]);

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleHeartClick = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setLikedTracks((prevLikedTracks) =>
      prevLikedTracks.includes(id)
        ? prevLikedTracks.filter((trackId) => trackId !== id)
        : [...prevLikedTracks, id]
    );
  };

  return (
    <div>
      <section>
        <div className="mx-8 mt-16 p-6 border-dashed border border-purple-600 rounded-lg">
          {error && <p className="text-red-500">{error}</p>}
          <ul>
            {tracks.map((track, index) => (
              <li
                key={track.id}
                className={`px-8 py-3 flex items-center space-x-4 cursor-pointer ${
                  selectedIndex === index ? "bg-gray-900" : ""
                }`}
                onClick={() => handleItemClick(index)}
              >
                <span>{index + 1}</span>
                <Image
                  src={track.album.images[2].url}
                  alt={`${track.name} album cover`}
                  width={52}
                  height={52}
                />
                <div className="flex flex-col flex-grow max-w-40">
                  <span className="font-semibold text-lg text-nowrap">
                    {track.name}
                  </span>
                  <span className="text-sidebarSubtitle">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </span>
                </div>
                <span className="flex flex-col flex-grow items-center pr-20">
                  {track.name}
                </span>
                <div className="ml-auto">
                  <span
                    className="cursor-pointer pr-4"
                    onClick={(e) => handleHeartClick(track.id, e)}
                  >
                    {likedTracks.includes(track.id) ? "❤️" : "🤍"}
                  </span>
                  <span>{formatDuration(track.duration_ms)}</span>
                </div>
              </li>
            ))}
          </ul>
          <div ref={ref}>
            {loading && <p>Loading more tracks...</p>}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ListPage;
