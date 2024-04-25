import { getTrending } from "@/actions";
import { AlbumArtwork } from "@/components/album-artwork";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Trending = async () => {
  const trending = await getTrending(0, 15);
  return (
    <div className="flex flex-col">
      <h2 className="mb-3 text-2xl font-semibold">Trending</h2>
      <div className="relative my-4">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {trending.map((item) => {
              return (
                <AlbumArtwork
                  key={item.id}
                  album={item}
                  className="w-[120px]"
                  aspectRatio="square"
                  width={120}
                  height={120}
                />
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Trending;
