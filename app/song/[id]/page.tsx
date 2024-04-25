import { getMusic } from "@/actions";
import Shell from "@/components/shell";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const music = await getMusic(id);
  if (!music) return null;

  return <Shell title={id}>{music.name}</Shell>;
};

export default Page;
