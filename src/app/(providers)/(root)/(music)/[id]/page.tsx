"use client";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";

function MusicDetailPage() {
  //가사 더미 데이터
  const [lyric, setlyric] = useState<string>(
    "ㅂㅁㄴㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂ"
  );
  //더보기 토글 스위치
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  //글자수 제한 선언
  const textLimit = useRef<number>(10);

  //조건에 따라 가사 보여주는 함수
  const lyricer = useMemo(() => {
    //글자수만큼 자른 짧은 버전 준비하기
    const shortReview = lyric.slice(0, textLimit.current);
    //원본이 제한보다 길면
    if (lyric.length > textLimit.current) {
      // 더보기 눌렸을 때 원본 리턴
      if (isShowMore) return lyric;
      // 접기 눌렸을 때 짧은 버전 리턴
      return shortReview;
    }
    return lyric;
  }, [isShowMore]);
  return (
    <main className="fixed bg-black top-0 bottom-0 left-0 right-0">
      <article>
        <section className="flex mb-16">
          {/* 앨범 사진, 제목, 가수, 좋아요, 댓글 수, 조회수? */}
          <div className="mr-5">
            <Image
              src={
                "https://i.namu.wiki/i/GYK2rhlm0pu6QSTovr5xT7u0upAls3gl-hY9FhqL36K9b0W9xk_J3a90ZJgg6H6_FR8hILz95lszaKCqHLqIF7WW_ktTIehCGSrT13t9GQM-PVhcvIbcXoi_wEBLdbdz1O1CwhHHdk0uLUm4yZEbZw.webp"
              }
              width={200}
              height={200}
              alt="album"
            />
          </div>

          <div className="flex flex-col justify-center text-[#B7B7B7] gap-4">
            <h1 className="text-white text-5xl font-bold ">How Sweet</h1>
            <h4 className="text-[#B7B7B7] text-2xl">NewJeans</h4>
            <div className="flex items-center w-4/5 justify-between whitespace-pre text-lg">
              <span className="flex items-center ">
                <GoHeart /> 500
              </span>
              <span className="flex items-center">
                <FaRegCommentAlt /> 30
              </span>
              <span className="flex items-center">
                <IoEyeSharp /> 1000
              </span>
            </div>
          </div>
        </section>

        <section>
          {/* 가사, 더보기? */}
          <h2 className="text-white text-3xl font-bold mb-5">가사</h2>
          <p className="text-[#B7B7B7]">
            {/* 더보기 이 안에서, css로 */}
            {lyricer}
          </p>
          <a
            className=" text-white cursor-pointer"
            onClick={() => {
              setIsShowMore(!isShowMore);
            }}
          >
            <span className="flex items-center">
              {lyric.length > textLimit.current &&
                (isShowMore ? (
                  <>
                    접기
                    <IoIosArrowUp className="size-5" />
                  </>
                ) : (
                  <>
                    더보기 <IoIosArrowDown className="size-5" />
                  </>
                ))}
            </span>
          </a>
        </section>
      </article>

      <article>{/* 댓글 UI */}</article>
    </main>
  );
}

export default MusicDetailPage;
