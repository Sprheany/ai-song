import { getTrending } from "@/actions";
import AlbumList from "@/components/album-list";
import Shell from "@/components/shell";

const Page = async () => {
  const data = await getTrending();

  return (
    <Shell title="Trending">
      <AlbumList musics={data} />
    </Shell>
  );
};

export default Page;
