"use client";

import LikedTracksList from "@/components/tracks/LikesTrackList/LikesTrackList";
import { useLikedTracks } from "@/lib/hooks/useLikedTracks";
import { useAuthStore } from "@/stores/useAuthStore";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import NicknameModal from "./NicknameModal";
import ProfileModal from "./ProfileModal";

function MyPage() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const supabase = createClient();

  const { user, setUser } = useAuthStore();
  const { data: likedTracksData } = useLikedTracks(user?.id);

  const firstTrackAlbumImage = likedTracksData?.pages[0]?.tracks[0]?.album.images[0]?.url || "/profileImg.png";

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
    <>
      <div className="flex flex-col relative pr-3">
        <div className="relative w-full h-64">
          <Image src={firstTrackAlbumImage} alt="mainimg" fill className="object-cover" />
        </div>
        <div className="flex justify-center items-center flex-col absolute top-1/2 left-1/2 transform translate-y-8 -translate-x-1/2 mb-10">
          <div className="relative">
            <div className="h-20 w-20">
              <Image src={user?.profileImg || "/profileImg.png"} alt="profileImg" fill className="object-cover rounded-3xl" />
            </div>
            <div className="absolute bottom-0 right-0 hover:text-brandPrimary cursor-pointer">
              <HiPencilSquare onClick={handleProfileClick} />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <p className="mt-4 mr-2">{user?.nickname || "nickname"}</p>
            <HiPencilSquare onClick={handleNicknameClick} className="mt-3 hover:text-brandPrimary cursor-pointer" />
          </div>
        </div>

        {showProfileModal && <ProfileModal onClose={() => setShowProfileModal(false)} />}
        {showNicknameModal && <NicknameModal onClose={() => setShowNicknameModal(false)} />}
      </div>
      <LikedTracksList />
    </>
  );
}

export default MyPage;
