import Link from "next/link";
import SidebarButton from "./SidebarButton";

function Sidebar() {
  return (
    <nav className="sidebar w-60 bg-surfaceDark px-4 py-6 sticky">
      {/* 사이드바 내용 */}
      <Link href={"/"}>
        <h2 className="text-brandPrimary text-center font-bold text-3xl md:text-4xl mb-8">Twinify</h2>
      </Link>
      <div className="my-collection">
        <h3 className="text-sidebarSubtitle text-sm md:text-base mb-4">MY COLLECTION</h3>
        <ul className="mb-8 space-y-4 px-2">
          <li>
            <SidebarButton icon="/icons/playlist.png" title="플레이리스트" href="/" disabled />
          </li>
          <li>
            <SidebarButton icon="/icons/album.png" title="앨범" href="/" disabled />
          </li>
          <li>
            <SidebarButton icon="/icons/track.png" title="트랙" href="/list" />
          </li>
          <li>
            <SidebarButton icon="/icons/video.png" title="비디오" href="/" disabled />
          </li>
          <li>
            <SidebarButton icon="/icons/artist.png" title="아티스트" href="/" disabled />
          </li>
        </ul>
      </div>
      <div className="my-playlists">
        <h3 className="text-sidebarSubtitle text-sm md:text-base mb-4">MY PLAYLISTS</h3>
        <ul className="space-y-4 px-2">
          <li>
            <SidebarButton href="/" title="Mixes and Radio" disabled />
          </li>
          <li>
            <SidebarButton href="/" title="September" disabled />
          </li>
          <li>
            <SidebarButton href="/" title="Clubbing" disabled />
          </li>
          <li>
            <SidebarButton href="/" title="Chil story2" disabled />
          </li>
          <li>
            <SidebarButton href="/" title="Playlist 342" disabled />
          </li>
          <li>
            <SidebarButton href="/" title="Tracks" disabled />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
