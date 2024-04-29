"use client";

import { deleteMusic, upsertMusic } from "@/actions";
import { cn, formatTime, getMusicName } from "@/lib/utils";
import { usePlayerStore } from "@/store/player-store";
import { Music } from "@prisma/client";
import { Disc3, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

type Props = {
  musics: Music[];
};

const AlbumCreationList = ({ musics }: Props) => {
  const { currentMusic, setMusic, isPlaying, setPlaying } = usePlayerStore();

  const [data, setData] = useState(() => musics);

  const onCheckedPublish = useCallback(async (music: Music) => {
    try {
      await upsertMusic([music]);
      setData((v) => v.map((item) => (item.id === music.id ? music : item)));
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);

  const onDeleteMusic = useCallback(async (id: string) => {
    try {
      await deleteMusic(id);
      setData((v) => v.filter((item) => item.id !== id));
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }, []);

  return (
    <Table>
      <TableBody>
        {data.map((item) => {
          const name = getMusicName(item);
          const isCurrentMusic = currentMusic?.id === item.id;
          const isCurrentPlaying = currentMusic?.id === item.id && isPlaying;

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
                  <p className="text-sm opacity-70 line-clamp-1">{item.tags}</p>
                  <p className="text-xs opacity-50">
                    {item.createdAt?.toLocaleString()}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-base font-bold">
                  {`${formatTime(item.duration)}'`}
                </p>
              </TableCell>
              <TableCell>
                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Label htmlFor="isPublish">Publish</Label>
                  <Switch
                    id="isPublish"
                    checked={item.isPublish}
                    onCheckedChange={(checked) => {
                      onCheckedPublish({
                        ...item,
                        isPublish: checked,
                      });
                    }}
                  />
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Add to Playlist"
                  className="rounded-full text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteMusic(item.id);
                  }}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AlbumCreationList;
