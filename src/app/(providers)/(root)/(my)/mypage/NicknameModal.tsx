import { useState, FC, useEffect } from "react";
import { createClient } from "@/supabase/client";
import { useAuthStore } from "@/stores/useAuthStore";

interface NicknameModalProps {
  onClose: () => void;
}

const NicknameModal: FC<NicknameModalProps> = ({ onClose }) => {
  const [nickname, setNickname] = useState("");
  const { user, setUser } = useAuthStore();
  const supabase = createClient();

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from("users").update({ nickname }).match({ id: user?.id });

    if (error) {
      console.error("닉네임 업데이트 중 오류 발생", error);
    } else {
      console.log("닉네임이 성공적으로 업데이트되었습니다", data);
      fetchUser();
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black p-4 rounded-2xl w-80 h-44 border-solid border-brandPrimary border-2 ml-80">
        <form onSubmit={handleSubmit}>
          <label className="flex justify-center flex-col items-center gap-2 text-xl">
            변경할 닉네임을 작성해주세요.
            <input type="text" value={nickname} onChange={handleNicknameChange} className="rounded-3xl text-black text-center outline-brandPrimary h-10" />
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

export default NicknameModal;
