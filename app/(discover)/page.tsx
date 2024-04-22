import { getTrending } from "@/actions/suno";
import Shell from "../shell";
import Newest from "./newest";
import Recommend from "./recommend";
import Trending from "./trending";

export default async function Page() {
  const trending = await getTrending();
  return (
    <Shell title="Discover" className="container mx-auto">
      <div className="flex flex-col gap-4">
        <Recommend />
        <Trending />
        <Newest />
      </div>
    </Shell>
  );
}
