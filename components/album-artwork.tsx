"use client";

import { cn, getMusicName } from "@/lib/utils";
import { usePlayerStore } from "@/store/player-store";
import { Music } from "@prisma/client";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Music;
  aspectRatio?: "portrait" | "square";
  width: number;
  height: number;
}

export function AlbumArtwork({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  const { currentMusic, setMusic, isPlaying, setPlaying } = usePlayerStore();

  const isCurrentPlaying = album.id === currentMusic?.id && isPlaying;
  const name = getMusicName(album);
  const coverImage =
    width > 200
      ? album.imageLargeUrl.length > 0
        ? album.imageLargeUrl
        : album.imageUrl
      : album.imageUrl;

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className={cn("relative group overflow-hidden rounded-md")}>
        <Image
          src={
            width > 200 ? album.imageLargeUrl ?? album.imageUrl : album.imageUrl
          }
          alt={name}
          width={width}
          height={height}
          className={cn(
            "h-auto object-cover transition-all group-hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
        <div className="hidden md:flex">
          <div
            className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center cursor-pointer bg-black opacity-0 transition-opacity group-hover:opacity-60"
            onClick={() => {
              setMusic(album);
              setPlaying(!isCurrentPlaying);
            }}
          >
            {isCurrentPlaying ? (
              <Pause className="w-12 h-12" stroke="white" />
            ) : (
              <Play className="w-12 h-12" stroke="white" />
            )}
          </div>
        </div>
      </div>
      <div className="space-y-1 text-sm">
        <Link href={`/song/${album.id}`} className="hover:underline">
          <h3 className="font-medium leading-none line-clamp-1">{name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {album.artistName}
        </p>
      </div>
    </div>
  );
}
