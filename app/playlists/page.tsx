"use client";

import AlbumList from "@/components/album-list";
import Shell from "@/components/shell";
import { useUserStore } from "@/store/user-store";

const Page = () => {
  const { playlists } = useUserStore();
  return (
    <Shell title="Playlists">
      <AlbumList musics={playlists} />
    </Shell>
  );
};

export default Page;
