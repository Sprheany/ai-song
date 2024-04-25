import { getNewest } from "@/actions";
import AlbumList from "@/components/album-list";
import Shell from "@/components/shell";

const Page = async () => {
  const data = await getNewest();

  return (
    <Shell title="Newest">
      <AlbumList musics={data} />
    </Shell>
  );
};

export default Page;
