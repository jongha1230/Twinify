"use client"

import { formatDuration } from "@/lib/utils/formatDuration"; // 트랙의 길이를 포맷하는 유틸리티 함수
import Image from "next/image";  // Next.js에서 이미지 최적화를 위한 컴포넌트
import { useState, useEffect } from "react";

// 인터페이스 정의
interface Artist {
  id: string;
  name: string;
}

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
}

interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
  duration_ms: number;
  popularity: number;
}

async function getAccessToken(): Promise<string> {
  const res = await fetch("/api/auth/token");
  const data = await res.json();
  return data.access_token;
}

async function fetchTracks(pageParam = 0): Promise<Track[]> {
  const access_token = await getAccessToken();
  const res = await fetch(`/api/spotify/popular?offset=${pageParam}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = await res.json();

  // data.tracks가 유효한지 확인
  if (!data || !data.tracks) {
    throw new Error("Failed to fetch tracks");
  }

  return data.tracks.map((track: any): Track => ({
    id: track.id,
    name: track.name,
    artists: track.artists.map((artist: any): Artist => ({
      id: artist.id,
      name: artist.name,
    })),
    album: {
      id: track.album.id,
      name: track.album.name,
      images: track.album.images,
    },
    duration_ms: track.duration_ms,
    popularity: track.popularity,
  }));
}

function ListPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [likedTracks, setLikedTracks] = useState<string[]>([]);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const data = await fetchTracks();
        setTracks(data);
      } catch (error) {
        console.error("Error loading tracks:", error);
      }
    };
    loadTracks();
  }, []);

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleHeartClick = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();  // 이벤트 버블링을 막음
    setLikedTracks(prevLikedTracks => (
      prevLikedTracks.includes(id) ? 
      prevLikedTracks.filter(trackId => trackId !== id) : 
      [...prevLikedTracks, id]
    ));  // 좋아요 상태를 토글
  };

  return (
    <div>
      <div>
        <button className="bg-surfaceDark font-semibold rounded-full px-5 py-2 m-2">전체</button>
        <button className="bg-surfaceDark font-semibold rounded-full px-5 py-2 m-2 border">발라드</button>
        <button className="bg-brandPrimary font-semibold text-black rounded-full px-5 py-2 m-2">발라드</button>
      </div>
      <section>
        <div className="mx-8 mt-16 p-6 border-dashed border border-purple-600 rounded-lg">
          <ul>
            {tracks.map((track, index) => (
              <li key={track.id} className={`px-8 py-3 flex items-center space-x-4 cursor-pointer ${selectedIndex === index ? "bg-gray-900" : ""}`} onClick={() => handleItemClick(index)}>
                <span>{index + 1}</span>
                <Image src={track.album.images?.[2]?.url || "/placeholder.png"} alt={`${track.name} album cover`} width={52} height={52} />
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
  );
}

export default ListPage;
