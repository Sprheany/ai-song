"use server";

import { Music, SunoMusic } from "@/types/music";
import { cache } from "react";

const BASE_URL = "https://studio-api.suno.ai/api";

export const getTrending = cache(async () => {
  const response = await fetch(
    `${BASE_URL}/playlist/1190bf92-10dc-4ce5-968a-7a377f37f984/?page=0`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }
  );
  const data = await response.json();
  const clips = data.playlist_clips as any[];

  const musics: Music[] = clips.map((item) => {
    const clip = item.clip as SunoMusic;
    return {
      id: clip.id,
      name: clip.title,
      artist: clip.display_name,
      audioUrl: clip.audio_url,
      coverImage: clip.image_url,
      duration: clip.metadata.duration,
    };
  });

  return musics;
});

export const getNewest = cache(async () => {
  const response = await fetch(
    `${BASE_URL}/playlist/cc14084a-2622-4c4b-8258-1f6b4b4f54b3/?page=0`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }
  );
  const data = await response.json();
  const clips = data.playlist_clips as any[];

  const musics: Music[] = clips.map((item) => {
    const clip = item.clip as SunoMusic;
    return {
      id: clip.id,
      name: clip.title,
      artist: clip.display_name,
      audioUrl: clip.audio_url,
      coverImage: clip.image_url,
      duration: clip.metadata.duration,
    };
  });

  return musics;
});
