"use server";

import { AudioInfo } from "@/lib/SunoApi";
import { audio2Music } from "@/lib/utils";
import prisma from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { Music, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const deleteMusic = async (id: string) => {
  await prisma.music.delete({
    where: {
      id,
    },
  });
  revalidatePath("/create");
  revalidatePath("/creations");
};

export const upsertMusic = async (musics: Music[]) => {
  const transactions: Prisma.PrismaPromise<any>[] = [];
  musics.forEach(async (item) => {
    transactions.push(
      prisma.music.upsert({
        where: {
          id: item.id,
        },
        update: item,
        create: item,
      })
    );
  });
  await prisma.$transaction(transactions);

  revalidatePath("/create");
  revalidatePath("/creations");
};

export const upsertAudio = async (audios: AudioInfo[]) => {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const artistId = user.id;
  const artistName = user.fullName || user.username || "";
  const musics: Music[] = audios.map((item) =>
    audio2Music(item, artistId, artistName)
  );

  await upsertMusic(musics);
};

export const getMyCreations = cache(async () => {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return [];
  }

  let musics = await prisma.music.findMany({
    where: {
      artistId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const ids = musics.filter((item) => !item.audioUrl).map((item) => item.id);
  if (ids.length > 0) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/get?ids=${ids}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data: AudioInfo[] = await response.json();

    const completed = data.filter((item) => item.status === "complete");

    await upsertAudio(completed);

    musics = [
      ...musics.filter((item) => !ids.includes(item.id)),
      ...completed.map((item) =>
        audio2Music(item, user.id, user.fullName || user.username || "")
      ),
    ];
  }

  return musics;
});

export const getMusic = async (id: string) => {
  const data = await prisma.music.findUnique({
    where: {
      id,
    },
  });
  const user = await currentUser();
  if (data?.artistId && user?.id !== data?.artistId && !data.isPublish) {
    return null;
  }

  return data;
};

export const getMusicByArtist = async (artistId: string) => {
  const data = await prisma.music.findMany({
    where: {
      artistId,
    },
    orderBy: {
      playCount: "desc",
    },
  });
  return data;
};

export const getTrending = cache(async (page = 0, limit = 50) => {
  const data = await prisma.music.findMany({
    where: {
      isPublish: true,
    },
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
    where: {
      isPublish: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: limit * page,
    take: limit,
  });

  return data;
});
