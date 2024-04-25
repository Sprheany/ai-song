import { Music } from "@prisma/client";
import { create } from "zustand";
import { useUserStore } from "./user-store";

type RepeatType = "all" | "one" | "off";

export type PlayerStoreState = {
  currentMusic: Music | null;
  isPlaying: boolean;
  volume: number;
  shuffle: boolean;
  repeatType: RepeatType;

  setMusic: (music: Music) => void;
  setPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  setShuffle: (shuffle: boolean) => void;
  switchRepeatType: () => void;
};

export const usePlayerStore = create<PlayerStoreState>((set) => ({
  currentMusic: null,
  isPlaying: false,
  volume: 0.5,
  shuffle: false,
  repeatType: "all",
  setMusic(music) {
    set({ currentMusic: music });
    if (music) {
      useUserStore.getState().addRecent(music);
    }
  },
  setPlaying(isPlaying) {
    set({ isPlaying });
  },
  setVolume(volume) {
    set({ volume });
  },
  setShuffle(shuffle) {
    set({ shuffle });
  },
  switchRepeatType() {
    switch (usePlayerStore.getState().repeatType) {
      case "all":
        set({ repeatType: "one" });
        break;
      case "one":
        set({ repeatType: "off" });
        break;
      case "off":
        set({ repeatType: "all" });
        break;
    }
  },
}));
