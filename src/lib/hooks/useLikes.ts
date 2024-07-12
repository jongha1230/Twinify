import api from "@/api/api";
import { Tables } from "@/types/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useLikes(userId: string | undefined) {
  const queryClient = useQueryClient();

  const likesQuery = useQuery<Tables<"likes">[], Error>({
    queryKey: ["likes", userId],
    queryFn: () => {
      if (!userId) throw new Error("No user ID");
      return api.likes.getUserLikes(userId)
    },
    enabled: !!userId,
  });

  const addLikeMutation = useMutation<Tables<"likes">, Error, string>({
    mutationFn: (trackId: string) => {
      if (!userId) throw new Error("No user ID");
      return api.likes.addLike(userId, trackId)},
    onMutate: async trackId => {
      await queryClient.cancelQueries({ queryKey: ["likes", userId] });
      const previousLikes = queryClient.getQueryData<Tables<"likes">[]>(["likes", userId]);

      queryClient.setQueryData<Tables<"likes">[]>(["likes", userId], old => {
        const newLike = { userId, trackId } as Tables<"likes">;
        return old ? [...old, newLike] : [newLike];
      });
      return { previousLikes };
    },
    onError: (error: Error, trackId: string, context: unknown) => {
      const typedContext = context as { previousLikes?: Tables<"likes">[] };
      if (typedContext?.previousLikes) {
        queryClient.setQueryData(["likes", userId], typedContext.previousLikes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", userId] });
    },
  });

  const removeLikeMutation = useMutation<void, Error, string>({
    mutationFn: (trackId: string) => {
      if (!userId) throw new Error("No user ID");
      return api.likes.removeLike(userId, trackId)},
    onMutate: async trackId => {
      await queryClient.cancelQueries({ queryKey: ["likes", userId] });

      const previousLikes = queryClient.getQueryData<Tables<"likes">[]>(["likes", userId]);

      queryClient.setQueryData<Tables<"likes">[]>(["likes", userId], old => (old ? old.filter(like => like.trackId !== trackId) : []));

      return { previousLikes };
    },
    onError: (error: Error, trackId: string, context: unknown) => {
      const typedContext = context as { previousLikes?: Tables<"likes">[] };
      if (typedContext?.previousLikes) {
        queryClient.setQueryData(["likes", userId], typedContext.previousLikes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", userId] });
      queryClient.invalidateQueries({ queryKey: ["likedTracks", userId] });
    },
  });

  return {
    likes: likesQuery.data as Tables<"likes">[] | undefined,
    isLoading: likesQuery.isLoading,
    error: likesQuery.error,
    addLike: addLikeMutation.mutate,
    removeLike: removeLikeMutation.mutate,
  };
}
