import api from "@/api/api";
import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";

const TRACKS_PER_PAGE = 10;

export type SearchTracksResponse = {
  tracks: SpotifyApi.TrackObjectFull[];
  nextOffset: number;
};

export const useSearchTracks = (query: string): UseInfiniteQueryResult<InfiniteData<SearchTracksResponse>, Error> => {
  return useInfiniteQuery<SearchTracksResponse, Error, InfiniteData<SearchTracksResponse>, string[], number>({
    queryKey: ["searchTracks", query],
    queryFn: async ({ pageParam }) => {
      const response = await api.spotify.searchTracks(query, pageParam.toString(), TRACKS_PER_PAGE.toString());
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextOffset;
    },
    enabled: !!query,
  });
};