import api from "@/api/api";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
const TRACKS_PER_PAGE = 10;

export type LikedTracksResponse = {
  tracks: SpotifyApi.TrackObjectFull[];
  totalLikes: number;
  nextOffset: number | null;
};

export const useLikedTracks = (userId: string, initialTracks: SpotifyApi.TrackObjectFull[], totalLikes: number) => {
  return useInfiniteQuery<LikedTracksResponse, Error, InfiniteData<LikedTracksResponse>, string[], number>({
    queryKey: ["likedTracks", userId],
    queryFn: async ({ pageParam = 0 }) => {
      if (pageParam === 0) {
        return {
          tracks: initialTracks,
          totalLikes,
          nextOffset: (initialTracks?.length || 0) < totalLikes ? initialTracks?.length || 0 : null,
        };
      }
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
    getNextPageParam: lastPage => lastPage.nextOffset,
    initialPageParam: 0,
    initialData: {
      pages: [
        {
          tracks: initialTracks || [],
          totalLikes,
          nextOffset: (initialTracks?.length || 0) < totalLikes ? initialTracks?.length || 0 : null,
        },
      ],
      pageParams: [0],
    },
  });
};
