"use server";

import prisma from "@/prisma/client";
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
