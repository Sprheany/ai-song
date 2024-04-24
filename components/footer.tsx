"use client";

import { usePlayerStore } from "@/store/player-store";
import { useUserStore } from "@/store/user-store";
import PlayerControl from "./player-control";
import PlayerInfo from "./player-info";
import PlaylistButton from "./playlist-button";
import VolumeButton from "./volume-button";

const Footer = () => {
  const { currentMusic, volume, setVolume } = usePlayerStore();
  const { playlists, cleanPlaylist } = useUserStore();

  if (!currentMusic) {
    return null;
  }

  return (
    <footer className="p-4 z-10 border-t">
      <div className="w-full flex flex-col space-y-4 justify-between md:grid md:grid-cols-3 md: md:space-y-0 md:space-x-4">
        <PlayerInfo
          music={currentMusic}
          className="justify-center md:justify-start "
        />
        <PlayerControl />
        <div className="flex gap-2 items-center justify-center md:justify-end">
          <PlaylistButton playlists={playlists} cleanPlaylist={cleanPlaylist} />
          <VolumeButton volume={volume} setVolume={setVolume} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
