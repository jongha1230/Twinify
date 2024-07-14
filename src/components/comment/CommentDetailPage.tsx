"use client";
import { deleteComment, updateComment } from "@/lib/utils/comments/commentData";
import { formatTimestamp } from "@/lib/utils/comments/formatCommentTime";
import { createClient } from "@/supabase/client";
import { Tables } from "@/types/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRef, useState } from "react";

interface User {
  createdAt: string | null;
  email: string | null;
  id: string;
  nickname: string | null;
  profileImg: string | null;
}

const CommentDetailPage = ({ comment, user }: { comment: Tables<"comments">; user: User }) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const queryClient = useQueryClient();
  const { id, trackId } = comment;
  //삭제 핸들러
  const deleteMutation = useMutation({
    mutationFn: ({ trackId, id }: { trackId: string; id: string }) => deleteComment({ trackId, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", trackId] });
    },
    onError: () => {
      alert("삭제 중 에러가 발생했습니다.");
    },
  });
  const deleteHandler = async () => {
    const {
      data: { session },
      error,
    } = await createClient().auth.getSession();
    const currentEmail = session?.user.email;
    const userId = session?.user.id;
    if (error || !currentEmail || !userId) {
      alert("로그인을 해주세요.");
      return;
    }
    if (userId !== comment.userId) {
      alert("작성자만 삭제 가능합니다.");
      return;
    }
    if (confirm("삭제하시겠습니까?")) {
      deleteMutation.mutate({ trackId, id });
    }
  };

  //수정핸들러
  const editMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      setIsEditing(false);
      alert("수정되었습니다");
      queryClient.invalidateQueries({ queryKey: ["comments", comment.trackId] });
    },
  });

  const editHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = textareaRef.current?.value;
    if (!content) {
      alert("수정할 내용을 입력하세요");
      return;
    }
    editMutation.mutate({ id: comment.id, trackId: comment.trackId, content });
  };

  const enableEditing = async () => {
    const {
      data: { session },
      error,
    } = await createClient().auth.getSession();

    const currentEmail = session?.user.email;
    const userId = session?.user.id;
    if (error || !currentEmail || !userId) {
      alert("로그인을 해주세요.");
      return;
    }

    if (userId !== comment.userId) {
      alert("작성자만 수정 가능합니다.");
      return;
    }
    setIsEditing(true);
  };

  return (
    <>
      {isEditing ? (
        <section className="py-10 border-b">
          <form onSubmit={editHandler}>
            <div className="bg-surfaceDark p-5 rounded-md">
              <div>
                <textarea ref={textareaRef} defaultValue={comment.content} className="bg-surfaceDark text-white resize-none w-full" />
              </div>
              <div className="flex justify-end">
                <button className="mr-3" type="submit">
                  수정
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  취소
                </button>
              </div>
            </div>
          </form>
        </section>
      ) : (
        <section className="py-10 text-white flex justify-between border-b">
          <div className="flex">
            <div>
              <Image src={user.profileImg || "/defaultProfile.webp"} width={50} height={50} alt="profile-img" className="rounded-full " />
            </div>
            <div className="ml-4 mt-3">
              <h4 className="mb-4 text-lg font-semibold">{user.nickname}</h4>
              <p className="mb-2 text-lg">{comment.content}</p>
              <p className="text-[#B7B7B7] text-sm">{formatTimestamp(comment.createdAt)}</p>
            </div>
          </div>
          <div>
            <button className="hover:scale-105" onClick={enableEditing}>
              수정
            </button>
            <span> | </span>
            <button className="hover:scale-105" onClick={deleteHandler}>
              삭제
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default CommentDetailPage;
