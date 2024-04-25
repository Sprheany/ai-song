"use client";

import AlbumList from "@/components/album-list";
import Shell from "@/components/shell";
import { useUserStore } from "@/store/user-store";

const Page = () => {
  const { recent } = useUserStore();

  return (
    <Shell title="Recently">
      <AlbumList musics={recent} />
    </Shell>
  );
};

export default Page;
