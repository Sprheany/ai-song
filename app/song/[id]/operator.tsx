"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/store/player-store";
import { useUserStore } from "@/store/user-store";
import { Music } from "@prisma/client";
import { Download, Heart, Pause, Play, PlusSquare, Share2 } from "lucide-react";

type Props = {
  music: Music;
};

const Operator = ({ music }: Props) => {
  const { currentMusic, setMusic, isPlaying, setPlaying } = usePlayerStore();
  const {
    playlists,
    addPlaylist,
    deletePlaylist,
    favorite,
    addFavorite,
    deleteFavorite,
  } = useUserStore();

  const isCurrentMusic = currentMusic?.id === music.id;
  const isFavorite = favorite.some((item) => music.id === item.id);
  const isPlaylist = playlists.some((item) => music.id === item.id);

  return (
    <div className="flex gap-4">
      <Button
        size="icon"
        className="rounded-full"
        onClick={() => {
          setMusic(music);
          setPlaying(isCurrentMusic ? !isPlaying : true);
        }}
        aria-label={isCurrentMusic && isPlaying ? "Pause" : "Play"}
      >
        {isCurrentMusic && isPlaying ? <Pause /> : <Play />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Add to Favorite"
        className="rounded-full text-pink-400 hover:text-pink-400"
        onClick={(e) => {
          e.stopPropagation();
          isFavorite ? deleteFavorite(music.id) : addFavorite(music);
        }}
      >
        <Heart className={cn("", isFavorite && "fill-pink-400")} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Add to Playlist"
        className="rounded-full text-sky-600 hover:text-sky-600"
        onClick={(e) => {
          e.stopPropagation();
          isPlaylist ? deletePlaylist(music.id) : addPlaylist(music);
        }}
      >
        <PlusSquare
          className={cn("", isPlaylist && "bg-sky-500 rounded text-white")}
        />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Share2 />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Download />
      </Button>
    </div>
  );
};

export default Operator;
