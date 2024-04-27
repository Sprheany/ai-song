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
        title: item.title,
        artistId: item.user_id,
        artistName: item.display_name,
        audioUrl: item.audio_url,
        imageUrl: item.image_url,
        imageLargeUrl: item.image_large_url,
        videoUrl: item.video_url,
        duration: item.metadata.duration ?? 0,
        tags: item.metadata.tags,
        lyrics: item.metadata.prompt,
        isPublish: item.is_public,
        playCount: item.play_count,
        upvoteCount: item.upvote_count,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(Date.now()),
      };

      if (!songs.find((item) => item.id === song.id)) {
        songs.push(song);
      }
    });

    await prisma.music.deleteMany({});
    const count = (await prisma.music.createMany({ data: songs })).count;

    console.log(`insert ${count} songs`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
