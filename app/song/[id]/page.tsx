import { getMusic, getMusicByArtist } from "@/actions";
import AlbumList from "@/components/album-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn, getMusicName } from "@/lib/utils";
import { CircleUserRound, Heart, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Operator from "./operator";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const music = await getMusic(id);
  if (!music) {
    return redirect("/404");
  }

  const name = getMusicName(music);
  const moreMusics = (await getMusicByArtist(music.artistId)).filter(
    (item) => item.id !== id
  );

  return (
    <main className="w-full flex flex-col container mx-auto p-4 lg:p-8 overflow-x-hidden overflow-y-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-8 flex flex-col space-y-4">
        <div className="flex gap-8 items-start">
          <Image
            src={music.imageUrl}
            alt="music cover"
            width={160}
            height={160}
            className="rounded-lg"
          />
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center gap-8">
              <p className="text-lg flex items-center">
                <CircleUserRound className="w-5 h-5 mr-1" />
                {music.artistName}
              </p>
              <p className="text-sm opacity-70">
                {music.createdAt.toLocaleDateString()}
              </p>
            </div>
            <h1 className="text-4xl font-semibold line-clamp-2">{name}</h1>
            <p className="pt-2 opacity-50 line-clamp-3">{music.tags}</p>
          </div>
        </div>
        <div className="pl-[192px] flex flex-col gap-4">
          <Operator music={music} />
          <div className="flex gap-8 items-center">
            <div className="flex space-x-2 items-center">
              <Play className="w-5 h-5 fill-muted-foreground stroke-muted-foreground" />
              <span>{music.playCount}</span>
            </div>
            <div className="flex space-x-2 items-center">
              <Heart className="w-5 h-5 fill-muted-foreground stroke-muted-foreground" />
              <span>{music.upvoteCount}</span>
            </div>
          </div>
        </div>
        <div className="border-t py-4" />
        <div
          className={cn(
            "flex flex-col gap-8",
            moreMusics.length > 0 && "lg:grid grid-cols-5"
          )}
        >
          <div className="col-span-3 flex flex-col gap-8">
            <p className="text-lg font-semibold">Lyrics</p>
            <p className="whitespace-pre-wrap">{music.lyrics}</p>
          </div>
          {moreMusics.length > 0 && (
            <div className="col-span-2 flex flex-col gap-8">
              <div className="border-t lg:hidden" />
              <h3 className="text-2xl font-semibold">More from this creator</h3>
              <AlbumList musics={moreMusics} showNumber={false} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
