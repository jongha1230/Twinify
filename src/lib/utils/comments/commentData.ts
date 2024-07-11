export const selectComment = async (trackId: string) => {
  const response = await fetch(`/api/tracks/comment?trackId=${trackId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const comments = await response.json();
  console.log("데이터 가져옴!", comments);
  return comments;
};

export const insertComment = async ({ content, user, trackId, createdAt }: { content: string; user: { userId: string }; trackId: string; createdAt: string }) => {
  try {
    const comment = { content, userId: user.userId, trackId, createdAt };
    const response = await fetch(`/api/tracks/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const data = await response.json();
    console.log(data);
    alert("저장 완료!");
  } catch (error) {
    alert(`오류가 발생했습니다.`);
    console.error(error);
  }
};

export const deleteComment = async ({ trackId, id }: { trackId: string; id: string }) => {
  const response = await fetch(`/api/tracks/comment?id=${id}&trackId=${trackId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const comments = await response.json();
  console.log("데이터 삭제됨!", comments);
};
