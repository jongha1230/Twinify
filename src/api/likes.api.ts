import { Tables } from "@/types/supabase";

class LikesAPI {
  async getUserLikes(userId: string): Promise<Tables<"likes">[]> {
    const response = await fetch(`/api/likes?userId=${userId}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch likes");
    const data = await response.json();

    return data.userLikes;
  }

  async addLike(userId: string, trackId: string): Promise<Tables<"likes">> {
    const response = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, trackId }),
    });
    if (!response.ok) throw new Error("Failed to add like");
    return response.json();
  }

  async removeLike(userId: string, trackId: string): Promise<void> {
    const response = await fetch(`/api/likes?userId=${userId}&trackId=${trackId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to remove like");
    return response.json();
  }
}

export default LikesAPI;
