"use client";

import api from '@/api/api';
import { useInfiniteChartTracks } from '@/lib/hooks/useInfiniteChartTracks';
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';

const TracksList = () => {
  const { data, isLoading, isError, ref } = useInfiniteChartTracks();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;

  return (
    <div>
      <h1>Chart Tracks</h1>
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.tracks.map((track) => (
            <div key={track.id}>
              <h3>{track.name}</h3>
              <p>{track.artists.map(artist => artist.name).join(', ')}</p>
            </div>
          ))}
        </React.Fragment>
      ))}
      <div ref={ref}>Loading more...</div>
    </div>
  );
};

export default TracksList;
