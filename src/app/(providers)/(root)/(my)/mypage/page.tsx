"use client";

import { HiPencilSquare } from "react-icons/hi2";
import { LuImagePlus } from "react-icons/lu";
import { IoMdHeart } from "react-icons/io";
import { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal";
import NicknameModal from "./NicknameModal";
import { useAuthStore } from "@/stores/useAuthStore";
import { createClient } from "@/supabase/client";

function MyPage() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const supabase = createClient();

  const { user, setUser } = useAuthStore();

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleNicknameClick = () => {
    setShowNicknameModal(true);
  };

  const fetchUser = async () => {
    const { data: userData, error: userError } = await supabase.from("users").select("*").eq("id", user?.id).single();
    if (userError) {
      console.error("사용자 정보를 불러오는 중 오류 발생", userError);
    } else {
      setUser(userData);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  return (
    <div className="flex flex-col relative pr-3">
      <div className="relative h-64">
        <img src="183200d234235c740.jpg" alt="mainimg" className="flex h-full w-full object-cover" />
      </div>
      <div className="flex justify-center items-center flex-col absolute top-1/2 left-1/2 transform translate-y-8 -translate-x-1/2 mb-10">
        <div className="relative">
          <img src={user?.profileImg || "profileImg.png"} alt="profileImg" className="h-20 w-20 rounded-3xl" />
          <div className="absolute bottom-0 right-0 hover:text-brandPrimary cursor-pointer">
            <HiPencilSquare onClick={handleProfileClick} />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p className="mt-4 mr-2">{user?.nickname || "nickname"}</p>
          <HiPencilSquare onClick={handleNicknameClick} className="mt-3 hover:text-brandPrimary cursor-pointer" />
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
                <p className="font-bold">3AM</p>
                <p className="font-light">가수명</p>
              </div>
            </div>
            <p className="flex-grow text-center font-light">앨범명</p>
            <IoMdHeart className="mr-10 text-2xl text-brandPrimary cursor-pointer" />
            <p className="font-bold">2:12</p>
          </div>
        </div>
      </div>
      {showProfileModal && <ProfileModal onClose={() => setShowProfileModal(false)} />}
      {showNicknameModal && <NicknameModal onClose={() => setShowNicknameModal(false)} />}
    </div>
  );
}

export default MyPage;
