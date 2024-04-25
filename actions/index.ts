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

export const getTrending = cache(async () => {
  const data = await prisma.music.findMany({
    orderBy: {
      playCount: "desc",
    },
    take: 50,
  });

  return data;
});

export const getNewest = cache(async () => {
  const data = await prisma.music.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });

  return data;
});
