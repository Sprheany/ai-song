import { SunoResponse, sunoList, sunoRequest } from "@/data/suno";
import { Music } from "@prisma/client";
import prisma from "./client";

const main = async () => {
  try {
    const response = await Promise.all(
      sunoList.map((item) =>
        sunoRequest(item.id).then((res) => res.json() as Promise<SunoResponse>)
      )
    );
    const clips = response
      .map((item) => item.playlist_clips.map((item) => item.clip))
      .flat();

    const songs: Music[] = [];
    clips.forEach((item) => {
      if (!item) return;
      if (item.metadata.error_type) {
        console.log({ item });
        return;
      }

      const song = {
        id: item.id,
        name: item.title,
        artist: item.display_name,
        audioUrl: item.audio_url,
        coverImage: item.image_large_url,
        duration: item.metadata.duration ?? 0,
        tags: item.metadata.tags,
        lyrics: item.metadata.prompt,
        playCount: item.play_count,
        upvoteCount: item.upvote_count,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(Date.now()),
      };

      if (!songs.find((item) => item.id === song.id)) {
        songs.push(song);
      }
    });

    console.log({ length: songs.length });

    await prisma.music.deleteMany({});
    await prisma.music.createMany({ data: songs });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
