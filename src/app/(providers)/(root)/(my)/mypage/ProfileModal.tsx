import { useAuthStore } from "@/stores/useAuthStore";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface ProfileModalProps {
  onClose: () => void;
}

const ProfileModal: FC<ProfileModalProps> = ({ onClose }) => {
  const [profileImage, setProfileImage] = useState("");
  const supabase = createClient();
  const { user, setUser } = useAuthStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => setProfileImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const fetchUser = async () => {
    const { data: userData, error: userError } = await supabase.from("users").select("*").eq("id", user?.id).single();
    if (userError) {
      console.error("사용자 정보를 불러오는 중 오류 발생", userError);
    } else {
      setUser(userData);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) return;

    const filePath = `profileImg/${uuidv4()}`;
    let { error: uploadError } = await supabase.storage.from("users").upload(filePath, file);
    if (uploadError) return console.error(uploadError);

    const { data } = await supabase.storage.from("users").getPublicUrl(filePath);

    if (user) {
      const { error: updateError } = await supabase.from("users").update({ profileImg: data.publicUrl }).eq("id", user.id);
      if (updateError) return console.error(updateError);

      await fetchUser();
      onClose();
    } else {
      console.error("error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user?.id]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black p-4 rounded-2xl w-80 h-auto border-solid border-brandPrimary border-2 ml-80">
        <form onSubmit={handleSubmit}>
          <label className="flex justify-center flex-col items-center gap-2 text-xl">
            변경할 이미지를 선택해주세요.
            <div className="flex justify-center text-center items-center">
              {profileImage ? (
                <Image src={profileImage} alt="프로필 이미지 미리보기" width={256} height={256} className=" object-cover rounded-xl" />
              ) : (
                <div className="border-dashed border-brandPrimary border-2 w-64 h-12 rounded-xl flex items-center justify-center cursor-pointer">이미지 추가하기</div>
              )}
              <input type="file" onChange={handleImageChange} className="hidden" />
            </div>
          </label>
          <div className="flex justify-center items-center mt-3 gap-3">
            <button type="submit" className="border-2 border-brandPrimary px-12 py-2 rounded-full font-bold hover:bg-brandPrimary">
              저장
            </button>
            <button className="border-2 border-brandPrimary px-12 py-2 rounded-full font-bold hover:bg-brandPrimary" type="button" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
