"use client";

import { cn, formatTime } from "@/lib/utils";
import { usePlayerStore } from "@/store/player-store";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

type Props = {
  className?: string;
};

const PlayerControl = ({ className }: Props) => {
  const { currentMusic, isPlaying, setPlaying, volume, setVolume } =
    usePlayerStore();

  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [slider, setSlider] = useState(1);
  const [drag, setDrag] = useState(0);

  useEffect(() => {
    const audio = new Audio(currentMusic?.audioUrl);
    audio.load();

    audio.oncanplay = () => {
      if (isPlaying) {
        audio.play();
      }
    };

    const setAudioData = () => {
      setDuration(audio.duration);
      setTime(audio.currentTime);
    };
    const setAudioTime = () => {
      const curTime = audio.currentTime ?? 0;
      setTime(curTime);
      setSlider((curTime / audio.duration) * 100);
    };
    const setAudioVolume = () => {
      setVolume(audio.volume);
    };
    const setAudioEnded = () => {
      setPlaying(false);
      setTime(0);
      setSlider(0);
    };

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("volumechange", setAudioVolume);
    audio.addEventListener("ended", setAudioEnded);

    setAudio(audio);

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("volumechange", setAudioVolume);
      audio.removeEventListener("ended", setAudioEnded);
      audio.pause();
      audio.src = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audio && currentMusic) {
      audio.src = currentMusic.audioUrl;
      audio.load();

      audio.oncanplay = () => {
        audio.play();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMusic]);

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        play();
      } else {
        pause();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  useEffect(() => {
    if (audio) {
      audio.currentTime = Math.round(drag * audio.duration) / 100;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drag]);

  const play = () => {
    if (audio) {
      setPlaying(true);
      audio.play();
    }
  };
  const pause = () => {
    if (audio) {
      setPlaying(false);
      audio.pause();
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="flex space-x-2 items-center justify-center">
        <Button variant="ghost" size="icon" className="rounded-full">
          <SkipBack />
        </Button>
        <Button
          variant="default"
          size="icon"
          className="rounded-full"
          onClick={() => setPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <SkipForward />
        </Button>
      </div>
      <div className="flex w-full items-center space-x-2">
        <p className="text-sm">{`${formatTime(time)}`}</p>
        <Slider
          className="flex-1"
          max={100}
          step={1}
          value={[slider]}
          onValueChange={([value]) => {
            setSlider(value);
            setDrag(value);
          }}
        />
        <p className="text-sm">{`${formatTime(duration)}`}</p>
      </div>
    </div>
  );
};

export default PlayerControl;
