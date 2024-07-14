"use client";
import api from "@/api/api";
import { useLikes } from "@/lib/hooks/useLikes";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CommentPage from "./_comments/CommentPage";

function MusicDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [track, setTrack] = useState<SpotifyApi.TrackObjectFull | null>(null);
  const { user } = useAuthStore();
  const userId = user?.id;
  const { likes, addLike, removeLike } = useLikes(userId);
  const isLiked = (trackId: string): boolean => {
    if (!Array.isArray(likes)) return false;
    return likes.some(like => like.trackId === trackId);
  };
  const handleHeartClick = (trackId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (isLiked(trackId)) {
      removeLike(trackId);
    } else {
      addLike(trackId);
    }
  };

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        const trackData = await api.spotify.getTrackDetails(id);
        if (!Array.isArray(trackData)) {
          setTrack(trackData);
        }
      } catch (error) {
        console.error("트랙 항목 받아오는 중에 에러 발생!:", error);
      }
    };
    fetchTrackDetails();
  }, [id]);

  return (
    <main className="flex flex-col justify-center items-center mt-16">
      {track && (
        <article className="mb-10  w-4/5">
          <section className="flex mb-16">
            <div className="mr-5">
              <Image src={track.album.images[0].url} width={200} height={200} alt="album" />
            </div>

            <div className="flex flex-col justify-center text-[#B7B7B7] gap-4">
              <h1 className="text-white text-5xl font-bold ">{track.name}</h1>
              <h4 className="text-[#B7B7B7] text-2xl">{track.album.artists[0].name}</h4>
              <h6>앨범명 - {track.album.name}</h6>
              <h6>{track.album.release_date}</h6>
            </div>
            <button
              className="flex items-center w-[140px] cursor-pointer ml-auto mt-auto bg-gray-700 rounded-full px-4 py-2 transition-all duration-300 ease-in-out border-b-4 border-gray-900 
              hover:translate-y-[4px] active:translate-y-[10px] shadow-md hover:shadow-sm"
              onClick={e => handleHeartClick(track.id, e)}
            >
              <p className="mr-2 text-white">좋아요</p>
              <span className="text-2xl transition-transform duration-300 ease-in-out hover:scale-110 inline-block">{isLiked(track.id) ? "❤️" : "🤍"}</span>
            </button>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold mb-5">미리 듣기</h2>
            {track.preview_url ? (
              <audio
                controls
                playsInline
                loop
                ref={audioRef}
                onLoadedMetadata={() => {
                  if (audioRef.current) {
                    audioRef.current.volume = 0.3;
                  }
                }}
              >
                <source src={track.preview_url || undefined} type={"audio/mp3"} />
              </audio>
            ) : (
              <p>미리 듣기가 제공되지 않는 음원입니다.</p>
            )}
          </section>
        </article>
      )}
      <CommentPage id={id} />
    </main>
  );
}

export default MusicDetailPage;
