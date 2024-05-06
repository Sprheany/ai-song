import { SubscriptionStatusType } from "@/config/lemonsqueezy";
import { Music } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AudioInfo } from "./SunoApi";

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
    music.title ||
    music.lyrics.slice(0, Math.min(50, music.lyrics.length)) ||
    music.tags
  );
};

/**
 * Pause for a specified number of seconds.
 * @param x Minimum number of seconds.
 * @param y Maximum number of seconds (optional).
 */
export const sleep = (x: number, y?: number): Promise<void> => {
  let timeout = x * 1000;
  if (y !== undefined && y !== x) {
    const min = Math.min(x, y);
    const max = Math.max(x, y);
    timeout = Math.floor(Math.random() * (max - min + 1) + min) * 1000;
  }
  // console.log(`Sleeping for ${timeout / 1000} seconds`);

  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const audio2Music = (
  audio: AudioInfo,
  artistId: string,
  artistName: string
) => ({
  id: audio.id,
  title: audio.title ?? "",
  artistId: artistId,
  artistName: artistName,
  audioUrl: audio.audio_url ?? "",
  imageUrl: audio.image_url ?? "",
  imageLargeUrl: audio.image_large_url ?? "",
  videoUrl: audio.video_url ?? "",
  duration: audio.duration ?? 0,
  lyrics: audio.lyric ?? "",
  tags: audio.tags ?? "",
  isPublish: false,
  playCount: audio.play_count ?? 0,
  upvoteCount: audio.upvote_count ?? 0,
  createdAt: new Date(audio.created_at),
  updatedAt: new Date(Date.now()),
});

export function formatPrice(priceInCents: string) {
  const price = parseFloat(priceInCents);
  const dollars = price / 100;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // Use minimumFractionDigits to handle cases like $59.00 -> $59
    minimumFractionDigits: dollars % 1 !== 0 ? 2 : 0,
  }).format(dollars);
}

export function isValidSubscription(status: SubscriptionStatusType) {
  return status !== "cancelled" && status !== "expired" && status !== "unpaid";
}
