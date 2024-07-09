import Image from "next/image";

const CommentPage = () => {
  return (
    <article className=" w-4/5">
      <section>
        <h2 className="text-white text-2xl font-bold mb-5">댓글</h2>
        <div className="bg-surfaceDark p-5 rounded-md">
          <p className="text-white font-bold mb-4">닉네임</p>
          <textarea
            className="bg-surfaceDark text-white resize-none w-full"
            placeholder="노래의 소감을 작성해주세요 :)"
          />
          <div className="flex justify-end">
            <button className="bg-[#A6A6A6] rounded-md pt-2 pb-2 pl-6 pr-6 ">
              등록
            </button>
          </div>
        </div>
      </section>

      <section className="py-10 text-white flex justify-between border-b">
        <div className="flex">
          <div>
            <Image
              src={
                "https://i.namu.wiki/i/GYK2rhlm0pu6QSTovr5xT7u0upAls3gl-hY9FhqL36K9b0W9xk_J3a90ZJgg6H6_FR8hILz95lszaKCqHLqIF7WW_ktTIehCGSrT13t9GQM-PVhcvIbcXoi_wEBLdbdz1O1CwhHHdk0uLUm4yZEbZw.webp"
              }
              width={50}
              height={50}
              alt="profile-img"
              className="rounded-full "
            />
          </div>
          <div className="ml-4 mt-4">
            <h4 className="mb-4 text-lg font-semibold">닉네임</h4>
            <p className="mb-2 text-lg">내용</p>
            <p className="text-[#B7B7B7] text-sm">2024-07-09</p>
          </div>
        </div>

        <div>
          <button>수정</button>
          <span> | </span>
          <button>삭제</button>
        </div>
      </section>
    </article>
  );
};

export default CommentPage;
