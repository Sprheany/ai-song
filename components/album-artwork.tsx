import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: any;
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
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div
        className={cn(
          "relative group overflow-hidden rounded-md",
          aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
        )}
      >
        <Image
          src={album.image_url}
          alt={album.title}
          width={width}
          height={height}
          className={cn(
            "h-full w-full object-cover transition-all group-hover:scale-105"
          )}
        />
        <div className="hidden lg:flex">
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center cursor-pointer bg-black opacity-0 transition-opacity group-hover:opacity-60">
            <Play className="w-12 h-12" stroke="white" />
          </div>
        </div>
      </div>
      <div className="space-y-1 text-sm">
        <Link href={`/song/${album.id}`}>
          <h3 className="font-medium leading-none line-clamp-1">
            {album.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {album.display_name}
        </p>
      </div>
    </div>
  );
}
