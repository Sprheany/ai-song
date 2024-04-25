"use client";

import AlbumList from "@/components/album-list";
import Shell from "@/components/shell";
import { useUserStore } from "@/store/user-store";

const Page = () => {
  const { favorite } = useUserStore();

  return (
    <Shell title="Favorites">
      <AlbumList musics={favorite} />
    </Shell>
  );
};

export default Page;
