"use client";
import CommentDetailPage from "@/components/comment/CommentDetailPage";
import { insertComment, selectComment } from "@/lib/utils/comments/commentData";
import { useAuthStore } from "@/stores/useAuthStore";
import { createClient } from "@/supabase/client";
import { Tables } from "@/types/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

const CommentPage = ({ id }: { id: string }) => {
  const trackId = id;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuthStore();

  const { data: comments } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => selectComment(id),
  });

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: insertComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      if (textareaRef.current) {
        textareaRef.current.value = "";
      }
    },
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      data: { session },
      error,
    } = await createClient().auth.getSession();

    const email = session?.user.email;
    const userId = session?.user.id;
    if (error || !email || !userId) {
      alert("로그인을 해주세요.");
      return;
    }
    const content = textareaRef.current?.value;
    if (!content) {
      alert("내용을 입력하세요.");
      return;
    }
    const createdAt = new Date().toISOString();
    addMutation.mutate({ content, userId, trackId, createdAt });
  };

  return (
    <article className=" w-4/5">
      {/* 입력창 */}
      <form onSubmit={submitHandler}>
        <h2 className="text-white text-2xl font-bold mb-5">댓글</h2>
        <div className="bg-surfaceDark p-5 rounded-md">
          <p className="text-white font-bold mb-4">{user?.nickname}</p>
          <textarea className="bg-surfaceDark text-white resize-none w-full" placeholder="노래의 소감을 작성해주세요 :)" ref={textareaRef} />
          <div className="flex justify-end">
            <button className="bg-[#A6A6A6] rounded-md pt-2 pb-2 pl-6 pr-6 transition-all duration-300 ease-in-out hover:translate-y-1 active:translate-y-2 hover:shadow-md border-b-4 border-[#858585]">
              등록
            </button>
          </div>
        </div>
      </form>
      {/* 댓글 리스트 */}
      {user && comments?.map((comment: Tables<"comments">) => <CommentDetailPage key={comment.id} comment={comment} user={user} />)}
    </article>
  );
};

export default CommentPage;
