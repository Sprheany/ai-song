"use client";

import { formatTime, getMusicName } from "@/lib/utils";
import { usePlayerStore } from "@/store/player-store";
import { Music } from "@prisma/client";
import { ListMusic, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
  playlists: Music[];
  cleanPlaylist: () => void;
};

const PlaylistButton = ({ playlists, cleanPlaylist }: Props) => {
  const { currentMusic, setMusic, isPlaying, setPlaying } = usePlayerStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <ListMusic />
          {playlists.length > 0 && (
            <Badge className="absolute top-0 right-0">{playlists.length}</Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-full h-full p-0">
        <ScrollArea className="p-4">
          <div className="w-80 h-96">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-full flex items-center justify-between">
                <p className="text-lg font-semibold">Playlists</p>
                <Button
                  variant="ghost"
                  size={"icon"}
                  aria-label="Clean Playlist"
                  className="rounded-full"
                  onClick={cleanPlaylist}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
              <div className="w-full flex flex-col gap-1">
                {playlists.map((item, index) => {
                  const name = getMusicName(item);
                  const isCurrentPlaying =
                    item.id === currentMusic?.id && isPlaying;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted data-[state=selected]:bg-muted cursor-pointer"
                      data-state={isCurrentPlaying && "selected"}
                      onClick={() => {
                        setMusic(item);
                        setPlaying(isCurrentPlaying ? !isPlaying : true);
                      }}
                    >
                      <div className="min-w-4">{index + 1}</div>
                      <Image
                        src={item.imageUrl}
                        alt={`${name} cover image`}
                        width={32}
                        height={32}
                        className="rounded-md"
                      />
                      <div className="flex-1 flex flex-col">
                        <Link
                          href={`/song/${item.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm line-clamp-1 hover:underline"
                        >
                          {name}
                        </Link>
                        <p className="text-xs opacity-50">
                          {formatTime(item.duration)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default PlaylistButton;
