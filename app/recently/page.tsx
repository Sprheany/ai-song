"use client";

import AlbumList from "@/components/album-list";
import { useUserStore } from "@/store/user-store";
import Shell from "../../components/shell";

const Page = () => {
  const { recent } = useUserStore();

  return (
    <Shell title="Recently">
      <AlbumList musics={recent} />
    </Shell>
  );
};

export default Page;
