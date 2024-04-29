import { getMyCreations } from "@/actions";
import AlbumCreationList from "@/components/album-creation-list";

const Creations = async () => {
  const data = await getMyCreations();

  return <AlbumCreationList musics={data} />;
};

export default Creations;
