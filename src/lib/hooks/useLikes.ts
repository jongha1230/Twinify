import api from "@/api/api";
import { Tables } from "@/types/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useLikes(userId: string) {
  const queryClient = useQueryClient();

  const likesQuery = useQuery<Tables<"likes">[], Error>({
    queryKey: ["likes", userId],
    queryFn: () => api.likes.getUserLikes(userId),
  });

  const addLikeMutation = useMutation<Tables<"likes">, Error, string>({
    mutationFn: (trackId: string) => api.likes.addLike(userId, trackId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["likes", userId] }),
  });

  const removeLikeMutation = useMutation<void, Error, string>({
    mutationFn: (trackId: string) => api.likes.removeLike(userId, trackId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["likes", userId] }),
  });

  return {
    likes: likesQuery.data as Tables<"likes">[] | undefined,
    isLoading: likesQuery.isLoading,
    error: likesQuery.error,
    addLike: addLikeMutation.mutate,
    removeLike: removeLikeMutation.mutate,
  };
}
