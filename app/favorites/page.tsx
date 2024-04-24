"use client";

import AlbumList from "@/components/album-list";
import { useUserStore } from "@/store/user-store";
import Shell from "../../components/shell";

const Page = () => {
  const { favorite } = useUserStore();

  return (
    <Shell title="Favorites">
      <AlbumList musics={favorite} />
    </Shell>
  );
};

export default Page;
