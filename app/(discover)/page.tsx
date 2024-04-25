import { getTrending } from "@/actions";
import Shell from "@/components/shell";
import Newest from "./newest";
import Recommend from "./recommend";
import Trending from "./trending";

export default async function Page() {
  const trending = await getTrending();
  return (
    <Shell title="Discover">
      <div className="flex flex-col gap-4">
        <Recommend />
        <Trending />
        <Newest />
      </div>
    </Shell>
  );
}
