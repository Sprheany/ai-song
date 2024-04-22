import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col">
      <Slider max={100} step={1} className="" />
      <div className="w-full h-20 flex items-center px-6 py-4 gap-2 lg:gap-4">
        <div className="flex items-center gap-2 md:w-72">
          <Image
            src={
              "https://imagedelivery.net/C9yUr1FL21Q6JwfYYh2ozQ/a121337b-5c05-44e0-de36-10516ed4c000/width=1920,quality=75"
            }
            alt="Cover"
            width={50}
            height={50}
          />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold line-clamp-2 tracking-tight">
              You Dee Oh (I Dee Dance)
            </p>
            <p className="text-sm opacity-50">Khalid</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full scale-75"
          >
            <SkipBack />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="rounded-full scale-90"
          >
            <Play />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="hidden rounded-full scale-90"
          >
            <Pause />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full scale-75"
          >
            <SkipForward />
          </Button>
        </div>
        <div className="hidden md:flex items-center justify-end gap-2 md:w-72">
          <Volume2 />
          <Slider defaultValue={[50]} max={100} step={1} className="w-28" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
