import { getMyCreations } from "@/actions";
import AlbumCreationList from "@/components/album-creation-list";
import Shell from "@/components/shell";

const Page = async () => {
  const data = await getMyCreations();

  return (
    <Shell title="My Songs">
      <div>
        <AlbumCreationList musics={data} />
      </div>
    </Shell>
  );
};

export default Page;
