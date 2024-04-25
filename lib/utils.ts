import { Music } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (seconds?: number) => {
  if (!seconds) {
    return "00:00";
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = hours > 0 ? hours.toString() + ":" : "";
  const formattedMinutes = minutes.toString().padStart(2, "0") + ":";
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return formattedHours + formattedMinutes + formattedSeconds;
};

export const getMusicName = (music: Music) => {
  return (
    music.name ||
    music.lyrics.slice(0, Math.min(50, music.lyrics.length)) ||
    music.tags
  );
};
