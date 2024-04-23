"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/lib/utils";
import { usePlayerStore } from "@/store/player-store";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Footer = () => {
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

  if (!currentMusic) {
    return null;
  }

  return (
    <footer className="p-4 z-10 border-t">
      <div className="w-full flex flex-col space-y-4 justify-between md:grid md:grid-cols-3 md: md:space-y-0 md:space-x-4">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <Image
            src={currentMusic.coverImage}
            alt="Cover"
            width={60}
            height={60}
          />
          <div className="flex flex-col h-full justify-around">
            <p className="text-sm font-bold line-clamp-2 tracking-tight">
              {currentMusic.name}
            </p>
            <p className="text-sm opacity-50">{currentMusic.artist}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
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
        <div className="flex space-x-2 items-center justify-center md:justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setVolume(volume <= 0 ? 0.5 : 0)}
          >
            {volume <= 0 ? <VolumeX /> : <Volume2 />}
          </Button>
          <Slider
            value={[volume]}
            onValueChange={(v) => setVolume(v[0])}
            max={1}
            step={0.1}
            className="w-24"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
