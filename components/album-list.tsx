"use client";

import { cn, formatTime, getMusicName } from "@/lib/utils";
import { usePlayerStore } from "@/store/player-store";
import { useUserStore } from "@/store/user-store";
import { Music } from "@prisma/client";
import { Disc3, Heart, PlusSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

type Props = {
  musics: Music[];
  showNumber?: boolean;
};

const AlbumList = ({ musics, showNumber = true }: Props) => {
  const { currentMusic, setMusic, isPlaying, setPlaying } = usePlayerStore();
  const {
    favorite,
    addFavorite,
    deleteFavorite,
    playlists,
    addPlaylist,
    deletePlaylist,
  } = useUserStore();

  return (
    <div>
      <Table>
        <TableBody>
          {musics.map((item, index) => {
            const name = getMusicName(item);
            const isCurrentMusic = currentMusic?.id === item.id;
            const isCurrentPlaying = currentMusic?.id === item.id && isPlaying;
            const isFavorite = favorite.some((music) => music.id === item.id);
            const isPlaylist = playlists.some((music) => music.id === item.id);

            return (
              <TableRow
                key={item.id}
                className="border-none rounded-lg cursor-pointer"
                data-state={isCurrentMusic && "selected"}
                onClick={() => {
                  setMusic(item);
                  setPlaying(isCurrentMusic ? !isPlaying : true);
                }}
              >
                {showNumber && (
                  <TableCell>
                    <div className="text-lg font-semibold text-foreground/60">
                      {(index + 1).toString().padStart(2, "0")}
                    </div>
                  </TableCell>
                )}
                <TableCell className="w-28 h-28">
                  <div className="relative">
                    <Image
                      src={item.imageUrl}
                      alt={name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div
                      className={cn(
                        "absolute top-0 left-0 right-0 bottom-0 rounded-md bg-black/60",
                        isCurrentPlaying
                          ? "flex items-center justify-center"
                          : "hidden"
                      )}
                    >
                      <Disc3 className="animate-spin duration-1000 text-white" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col items-start justify-center gap-2">
                    <Link
                      href={`/song/${item.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:underline"
                    >
                      <h3 className="text-base font-semibold tracking-tight line-clamp-2">
                        {name}
                      </h3>
                    </Link>
                    <p className="text-sm opacity-50 line-clamp-1">
                      {item.artistName}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-base font-bold">
                    {`${formatTime(item.duration)}'`}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Add to Favorite"
                      className="rounded-full text-pink-400 hover:text-pink-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        isFavorite
                          ? deleteFavorite(item.id)
                          : addFavorite(item);
                      }}
                    >
                      <Heart
                        className={cn("h-5 w-5", isFavorite && "fill-pink-400")}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Add to Playlist"
                      className="rounded-full text-sky-600 hover:text-sky-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        isPlaylist
                          ? deletePlaylist(item.id)
                          : addPlaylist(item);
                      }}
                    >
                      <PlusSquare
                        className={cn(
                          "h-5 w-5",
                          isPlaylist && "bg-sky-500 rounded text-white"
                        )}
                      />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AlbumList;
