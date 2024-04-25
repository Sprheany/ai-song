import { getTrending } from "@/actions";
import { AlbumArtwork } from "@/components/album-artwork";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Music } from "@prisma/client";

const Recommend = async () => {
  const trending = await getTrending();

  const count = Math.min(5, trending.length);
  const data: Music[] = [];
  for (let i = 0; i < count; i++) {
    const random = Math.floor(Math.random() * trending.length);
    data.push(trending.splice(random, 1)[0]);
  }

  return (
    <div className="flex flex-col">
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {data.map((item) => {
            return (
              <AlbumArtwork
                key={item.id}
                album={item}
                className="w-[250px]"
                aspectRatio="portrait"
                width={250}
                height={300}
              />
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default Recommend;
