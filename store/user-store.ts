import { Music } from "@prisma/client";
import { create } from "zustand";

type UserStoreState = {
  playlists: Music[];
  recent: (Music & { time: number })[];
  favorite: Music[];

  addPlaylist: (music: Music) => void;
  deletePlaylist: (id: String) => void;
  cleanPlaylist: () => void;
  addRecent: (music: Music) => void;
  cleanRecent: () => void;
  addFavorite: (music: Music) => void;
  deleteFavorite: (id: String) => void;
};

export const useUserStore = create<UserStoreState>((set) => ({
  playlists: [],
  recent: [],
  favorite: [],

  addPlaylist(music) {
    set((state) => ({
      playlists: [...state.playlists, music],
    }));
  },
  deletePlaylist(id) {
    set((state) => ({
      playlists: state.playlists.filter((item) => item.id !== id),
    }));
  },
  cleanPlaylist() {
    set(() => ({
      playlists: [],
    }));
  },
  addRecent(music) {
    set((state) => ({
      recent: state.recent.some((item) => item.id === music.id)
        ? state.recent
        : [...state.recent, { ...music, time: Date.now() }].toSorted((a, b) => {
            return b.time - a.time;
          }),
    }));
  },
  cleanRecent() {
    set(() => ({
      recent: [],
    }));
  },
  addFavorite(music) {
    set((state) => ({
      favorite: [...state.favorite, music],
    }));
  },
  deleteFavorite(id) {
    set((state) => ({
      favorite: state.favorite.filter((item) => item.id !== id),
    }));
  },
}));
