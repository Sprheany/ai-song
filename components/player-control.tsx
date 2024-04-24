"use client";

import { cn, formatTime } from "@/lib/utils";
import { usePlayerStore } from "@/store/player-store";
import { useUserStore } from "@/store/user-store";
import {
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

type Props = {
  className?: string;
};

const PlayerControl = ({ className }: Props) => {
  const {
    currentMusic,
    setMusic,
    isPlaying,
    setPlaying,
    volume,
    setVolume,
    shuffle,
    setShuffle,
    repeatType,
    switchRepeatType,
  } = usePlayerStore();
  const { playlists } = useUserStore();

  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [slider, setSlider] = useState(1);
  const [drag, setDrag] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

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
      setHasEnded((v) => !v);
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
      pause();
      audio.src = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audio) {
      audio.src = currentMusic?.audioUrl ?? "";
      audio.load();

      audio.oncanplay = () => {
        if (isPlaying) {
          play();
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio, currentMusic]);

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
      switch (repeatType) {
        case "off":
          pause();
          break;
        case "one":
          audio.currentTime = 0;
          play();
          break;
        case "all":
          audio.currentTime = 0;
          if (playlists.length <= 0) {
            play();
            return;
          }
          if (shuffle) {
            shufflePlay();
          } else {
            next();
          }
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasEnded]);

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

  const previous = () => {
    if (playlists.length <= 0) {
      return;
    }
    const index = playlists.findIndex((music) => music.id === currentMusic?.id);
    const nextIndex = (index - 1 + playlists.length) % playlists.length;
    setMusic(playlists[nextIndex]);
  };

  const shufflePlay = () => {
    if (playlists.length <= 0) {
      return;
    }
    const index = playlists.findIndex((music) => music.id === currentMusic?.id);
    let rand = index;
    while (rand === index) {
      rand = Math.floor(Math.random() * playlists.length);
    }
    setMusic(playlists[rand]);
  };

  const next = () => {
    if (playlists.length <= 0) {
      return;
    }
    const index = playlists.findIndex((music) => music.id === currentMusic?.id);
    const nextIndex = (index + 1) % playlists.length;
    setMusic(playlists[nextIndex]);
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="flex space-x-2 items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          className={cn("rounded-full", !shuffle && "opacity-50")}
          onClick={() => setShuffle(!shuffle)}
        >
          <Shuffle className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={previous}
        >
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
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={next}
        >
          <SkipForward />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn("rounded-full", repeatType === "off" && "opacity-50")}
          onClick={switchRepeatType}
        >
          {repeatType === "one" ? (
            <Repeat1 className="w-4 h-4" />
          ) : (
            <Repeat className="w-4 h-4" />
          )}
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
