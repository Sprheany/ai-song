"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

type Props = {
  volume: number;
  setVolume: (volume: number) => void;
};

const VolumeButton = ({ volume, setVolume }: Props) => {
  const cachedVolume = useRef(volume);

  const changeVolume = (value: number, isDrag: boolean = true) => {
    setVolume(value);
    if (isDrag) {
      cachedVolume.current = value;
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => {
          changeVolume(volume > 0 ? 0 : cachedVolume.current || 0.5, false);
        }}
      >
        {volume <= 0 ? <VolumeX /> : <Volume2 />}
      </Button>
      <Slider
        value={[volume]}
        onValueChange={(v) => changeVolume(v[0])}
        max={1}
        step={0.1}
        className="w-24"
      />
    </div>
  );
};

export default VolumeButton;
