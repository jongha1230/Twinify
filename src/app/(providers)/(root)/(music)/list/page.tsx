"use client"

import { useState } from "react";


function ListPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [likedTracks, setLikedTracks] = useState<number[]>([]);

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleHeartClick = (id: number) => {
    setLikedTracks((prevLikedTracks) =>
      prevLikedTracks.includes(id)
        ? prevLikedTracks.filter((trackId) => trackId !== id)
        : [...prevLikedTracks, id]
    );
  };

  const tracks = [
    { id: 1, title: 'Play It Safe', singer: 'Julia Wolf',like: '🤍', duration: '03:30' },
    { id: 2, title: 'Dance Tonight', singer: 'John Doe',like: '🤍', duration: '04:15' },
    { id: 3, title: 'Memories', singer: 'Jane Smith',like: '🤍', duration: '03:50' },{ id: 1, title: 'Play It Safe', singer: 'Julia Wolf',like: '🤍', duration: '03:30' },
    { id: 2, title: 'Dance Tonight', singer: 'John Doe',like: '🤍', duration: '04:15' },
    { id: 3, title: 'Memories', singer: 'Jane Smith',like: '🤍', duration: '03:50' },{ id: 1, title: 'Play It Safe', singer: 'Julia Wolf',like: '🤍', duration: '03:30' },
    { id: 2, title: 'Dance Tonight', singer: 'John Doe',like: '🤍', duration: '04:15' },
    { id: 3, title: 'Memories', singer: 'Jane Smith',like: '🤍', duration: '03:50' },
  ];

  
  return (
  <div>
    <div> 
      <button className="bg-surfaceDark font-semibold rounded-full px-5 py-2 m-2">전체</button>
    <button className="bg-surfaceDark font-semibold rounded-full px-5 py-2 m-2 border">발라드</button>
    <button className="bg-brandPrimary font-semibold text-black rounded-full px-5 py-2 m-2">발라드</button>
    </div>
    <div className="m-8 p-6 border-dashed border border-purple-600 rounded-lg">
    <ul>
          {tracks.map((track, index) => (
            <li
              key={track.id}
              className={`px-8 py-3 flex items-center space-x-4 cursor-pointer ${
                selectedIndex === index ? 'bg-gray-900' : ''
              }`}
              onClick={() => handleItemClick(index)}
            >
              <span>{track.id}</span>
              <img
                src="https://via.placeholder.com/100"
                alt="Placeholder Image"
                width={52}
                height={52}
              />
              <div className="flex flex-col flex-grow max-w-40">
                <span className="font-semibold text-lg">{track.title}</span>
                <span className="text-sidebarSubtitle">{track.singer}</span>
              </div>
              <span className="flex flex-col flex-grow items-center pr-20">{track.title}</span>
              <div className="ml-auto">
              <span
                  className="cursor-pointer pr-4"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from affecting the parent element
                    handleHeartClick(track.id);
                  }}
                >
                  {likedTracks.includes(track.id) ? '❤️' : '🤍'}
                </span>
                <span>{track.duration}</span>
              </div>
            </li>
          ))}
        </ul>
    </div>
    </div>
    );
}

export default ListPage;