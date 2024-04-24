import { Music } from "@/types/music";
import { create } from "zustand";
import { useUserStore } from "./user-store";

export type PlayerStoreState = {
  currentMusic: Music | null;
  isPlaying: boolean;
  volume: number;

  setMusic: (music: Music) => void;
  setPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
};

export const usePlayerStore = create<PlayerStoreState>((set) => ({
  currentMusic: null,
  isPlaying: false,
  volume: 0.5,
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
}));
