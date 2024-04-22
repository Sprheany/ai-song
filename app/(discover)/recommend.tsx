import { getTrending } from "@/actions/suno";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AlbumArtwork } from "../../components/album-artwork";

const Recommend = async () => {
  const trending = await getTrending();
  return (
    <div className="flex flex-col">
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {trending.slice(0, 5).map((item) => {
            const album = item.clip;
            return (
              <AlbumArtwork
                key={album.id}
                album={album}
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
