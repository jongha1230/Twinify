"use client";
import SpotifyService from "@/lib/utils/spotifyService";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import fakeData from "../../_data/data.json";
import CommentPage from "./_comments/page";

function MusicDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const tracks = fakeData.tracks;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [clickLike, setClickLike] = useState<boolean>(false);

  const [trackDetails, setTrackDetails] = useState<SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectFull[]>([]);

  useEffect(() => {
    const getTrackDetails = async () => {
      if (id) {
        const spotifyService = new SpotifyService();
        try {
          const details = await spotifyService.getTrackDetails(id);
          setTrackDetails(details);
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message);
          }
        }
      }
    };
    getTrackDetails();
  }, [id]);

  return (
    <main className="flex flex-col justify-center items-center mt-16">
      {trackDetails && (
        <article className="mb-10  w-4/5">
          <section className="flex mb-16">
            <div className="mr-5">
              <Image src={tracks[0].album.images[0].url} width={200} height={200} alt="album" />
            </div>

            <div className="flex flex-col justify-center text-[#B7B7B7] gap-4">
              <h1 className="text-white text-5xl font-bold ">{tracks[0].name}</h1>
              <h4 className="text-[#B7B7B7] text-2xl">{tracks[0].album.artists[0].name}</h4>
              <h6>앨범명 - {tracks[0].album.name}</h6>
              <h6>{tracks[0].album.release_date}</h6>
            </div>
            {/* <div className="flex items-center justify-between text-lg"> */}
            <span className="flex items-center cursor-pointer ml-auto mt-auto" onClick={() => setClickLike(!clickLike)}>
              좋아요{clickLike ? <IoMdHeart className="size-9" /> : <IoMdHeartEmpty className="size-9" />}
            </span>
            {/* <span className="flex items-center">
                <FaRegCommentAlt /> 30
              </span>
              <span className="flex items-center">
                <IoEyeSharp /> 1000
              </span> */}
            {/* </div> */}
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold mb-5">미리 듣기</h2>
            <audio muted controls playsInline loop ref={audioRef}>
              <source src={tracks[0].preview_url} type={"audio/mp3"} />
            </audio>
          </section>
        </article>
      )}

      <CommentPage id={id} />
    </main>
  );
}

export default MusicDetailPage;
