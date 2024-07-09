import { HiPencilSquare } from "react-icons/hi2";
import { LuImagePlus } from "react-icons/lu";
import { IoMdHeart } from "react-icons/io";

function MyPage() {
  return (
    <div className="flex flex-col px-60 relative">
      <div className="relative h-64">
        <img
          src="183200d234235c740.jpg"
          alt="mainimg"
          className="flex h-full w-full object-cover"
        />
        <div className="absolute bottom-0 right-0 text-4xl hover:text-brandPrimary cursor-pointer">
          <LuImagePlus className="mr-2 mb-2" />
        </div>
      </div>
      <div className="flex justify-center items-center flex-col absolute top-1/2 left-1/2 transform translate-y-8 -translate-x-1/2 mb-10">
        <div className="relative">
          <img
            src="profileImg.png"
            alt="profileImg"
            className="h-20 w-20 rounded-3xl"
          />
          <div className="absolute bottom-0 right-0 hover:text-brandPrimary cursor-pointer">
            <HiPencilSquare />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p className="mt-4 mr-2">Nickname</p>
          <HiPencilSquare className="mt-3 hover:text-brandPrimary cursor-pointer" />
        </div>
      </div>
      <div className="transform translate-y-28">
        <div className="font-bold mb-6 text-2xl px-12">좋아요 목록</div>
        <div className="px-32">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <p className="mr-8 text-3xl">1</p>
              <img src="profileImg.png" alt="albumCover" className="h-14" />
              <div className="flex flex-col ml-4">
                <p>3AM</p>
                <p>가수명</p>
              </div>
            </div>
            <p className="flex-grow text-center">앨범명</p>
            <IoMdHeart className="mr-10 text-2xl text-brandPrimary cursor-pointer" />
            <p>2:12</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
