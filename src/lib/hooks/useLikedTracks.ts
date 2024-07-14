import api from "@/api/api";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
const TRACKS_PER_PAGE = 10;

export type LikedTracksResponse = {
  tracks: SpotifyApi.TrackObjectFull[];
  totalLikes: number;
  nextOffset: number | null;
};

type Like =  {
  created_at: string | null;
  trackId: string;
  userId: string;
}[]

export const useLikedTracks = (userId: string | undefined, likes: Like | undefined) => {
  return useInfiniteQuery<LikedTracksResponse, Error, InfiniteData<LikedTracksResponse>, (string | undefined)[], number>({
    queryKey: ["likedTracks", userId],
    queryFn: async ({ pageParam = 0 }) => {
      if (!userId) throw new Error("User ID is required");
      if (!likes) throw new Error("Likes data is required");
      
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
    enabled: !!userId && !!likes && likes.length > 0,
    getNextPageParam: lastPage => lastPage.nextOffset,
    initialPageParam: 0,
    refetchInterval: 5000,
    staleTime: 0, 
  });
};
