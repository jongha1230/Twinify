// "use client"

// import api from "@/api/api";
// import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { useInView } from "react-intersection-observer";

// interface ChartTracksResponse {
//   tracks: SpotifyApi.TrackObjectFull[];
//   nextOffset: number;
// }

// export const useInfiniteChartTracks = () => {
//   const { ref, inView } = useInView();

//   const infiniteQuery = useInfiniteQuery<
//     ChartTracksResponse,
//     Error,
//     InfiniteData<ChartTracksResponse>,
//     ['chartTracks'],
//     number
//   >({
//     queryKey: ['chartTracks'],
//     queryFn: ({ pageParam = 0 }) => 
//       api.spotify.getChartTracks(pageParam.toString()),
//     getNextPageParam: (lastPage) => lastPage.nextOffset,
//     initialPageParam: 0,
//   });

//   const { fetchNextPage, hasNextPage, isFetchingNextPage } = infiniteQuery;

//   useEffect(() => {
//     if (inView && hasNextPage && !isFetchingNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

//   return {
//     ...infiniteQuery,
//     ref,
//   };
// };