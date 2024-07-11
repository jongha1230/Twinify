import { deleteComment } from "@/lib/utils/comments/commentData";
import { formatTimestamp } from "@/lib/utils/comments/formatCommentTime";
import { Tables } from "@/types/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

const CommentDetailPage = ({ comment, user }: { comment: Tables<"comments">; user: { nickname: string } }) => {
  const queryClient = useQueryClient();

  const { id, trackId } = comment;
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteComment(id, trackId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id, trackId] });
    },
    onError: () => {
      alert("삭제 중 에러가 발생했습니다.");
    },
  });

  const deleteHandler = () => {
    deleteMutation.mutate(comment.id);
  };

  return (
    <section className="py-10 text-white flex justify-between border-b">
      <div className="flex">
        <div>
          <Image
            src={"https://i.namu.wiki/i/GYK2rhlm0pu6QSTovr5xT7u0upAls3gl-hY9FhqL36K9b0W9xk_J3a90ZJgg6H6_FR8hILz95lszaKCqHLqIF7WW_ktTIehCGSrT13t9GQM-PVhcvIbcXoi_wEBLdbdz1O1CwhHHdk0uLUm4yZEbZw.webp"}
            width={50}
            height={50}
            alt="profile-img"
            className="rounded-full "
          />
        </div>
        <div className="ml-4 mt-4">
          <h4 className="mb-4 text-lg font-semibold">{user.nickname}</h4>
          <p className="mb-2 text-lg">{comment.content}</p>
          <p className="text-[#B7B7B7] text-sm">{formatTimestamp(comment.createdAt)}</p>
        </div>
      </div>

      <div>
        <button>수정</button>
        <span> | </span>
        <button onClick={deleteHandler}>삭제</button>
      </div>
    </section>
  );
};

export default CommentDetailPage;
