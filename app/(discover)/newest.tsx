import { getNewest } from "@/actions/suno";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AlbumArtwork } from "../../components/album-artwork";

const Newest = async () => {
  const trending = await getNewest();
  return (
    <div className="flex flex-col">
      <h2 className="mb-3 text-2xl font-semibold">Newest</h2>
      <div className="relative my-4">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {trending.map((item) => {
              const album = item.clip;
              return (
                <AlbumArtwork
                  key={album.id}
                  album={album}
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

export default Newest;
