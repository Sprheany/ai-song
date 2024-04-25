"use server";

import prisma from "@/prisma/client";
import { Music } from "@prisma/client";
import { cache } from "react";

export const getMusic = async (id: string) => {
  const data = await prisma.music.findUnique({
    where: {
      id,
    },
  });
  return data;
};

export const getMusicByArtist = async (artist: string) => {
  const data = await prisma.music.findMany({
    where: {
      artist,
    },
    orderBy: {
      playCount: "desc",
    },
  });
  return data;
};

export const getRecommend = cache(async () => {
  const trending = await getTrending();

  const count = Math.min(5, trending.length);
  const data: Music[] = [];
  for (let i = 0; i < count; i++) {
    const random = Math.floor(Math.random() * trending.length);
    data.push(trending.splice(random, 1)[0]);
  }

  return data;
});

export const getTrending = cache(async (page = 0, limit = 50) => {
  const data = await prisma.music.findMany({
    orderBy: {
      playCount: "desc",
    },
    skip: limit * page,
    take: limit,
  });

  return data;
});

export const getNewest = cache(async (page = 0, limit = 50) => {
  const data = await prisma.music.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: limit * page,
    take: limit,
  });

  return data;
});
