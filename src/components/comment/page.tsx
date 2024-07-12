"use client";
import { deleteComment, updateComment } from "@/lib/utils/comments/commentData";
import { formatTimestamp } from "@/lib/utils/comments/formatCommentTime";
import { createClient } from "@/supabase/client";
import { Tables } from "@/types/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRef, useState } from "react";

const CommentDetailPage = ({ comment, nickname }: { comment: Tables<"comments">; nickname: string }) => {
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
            <div className="ml-4 mt-3">
              <h4 className="mb-4 text-lg font-semibold">{nickname}</h4>
              <p className="mb-2 text-lg">{comment.content}</p>
              <p className="text-[#B7B7B7] text-sm">{formatTimestamp(comment.createdAt)}</p>
            </div>
          </div>
          <div>
            <button onClick={enableEditing}>수정</button>
            <span> | </span>
            <button onClick={deleteHandler}>삭제</button>
          </div>
        </section>
      )}
    </>
  );
};

export default CommentDetailPage;
