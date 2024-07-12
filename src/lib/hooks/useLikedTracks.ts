import api from "@/api/api";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
const TRACKS_PER_PAGE = 10;

export type LikedTracksResponse = {
  tracks: SpotifyApi.TrackObjectFull[];
  totalLikes: number;
  nextOffset: number | null;
};

export const useLikedTracks = (userId: string | undefined) => {
  return useInfiniteQuery<LikedTracksResponse, Error, InfiniteData<LikedTracksResponse>, (string | undefined)[], number>({
    queryKey: ["likedTracks", userId],
    queryFn: async ({ pageParam = 0 }) => {
      if (!userId) throw new Error("User ID is required");
      const likes = await api.likes.getUserLikes(userId);
      const pageStart = pageParam;
      const pageEnd = pageStart + TRACKS_PER_PAGE;
      const pageLikes = likes.slice(pageStart, pageEnd);

      const trackIds = pageLikes.map(like => like.trackId);
      const tracks = (await api.spotify.getTrackDetails(trackIds)) as SpotifyApi.TrackObjectFull[];

      return {
        tracks,
        totalLikes: likes.length,
        nextOffset: pageEnd < likes.length ? pageEnd : null,
      };
    },
    enabled: !!userId,
    getNextPageParam: lastPage => lastPage.nextOffset,
    initialPageParam: 0,
    refetchInterval: 5000,
    staleTime: 0, 
  });
};
