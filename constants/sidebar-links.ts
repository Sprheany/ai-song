import { SidebarGroup } from "@/types/sidebar";
import {
  CreditCard,
  Flame,
  Heart,
  HistoryIcon,
  Layers,
  ListMusic,
  MicVocal,
  Radar,
  Rss,
  Sparkles,
  User,
} from "lucide-react";

export const sidebarLinks: SidebarGroup[] = [
  {
    title: "Music",
    items: [
      {
        name: "Discover",
        href: "/",
        icon: Radar,
      },
      {
        name: "Trending",
        href: "/trending",
        icon: Flame,
      },
      {
        name: "Newest",
        href: "/newest",
        icon: Rss,
      },
      {
        name: "Categories",
        href: "/categories",
        icon: Layers,
      },
      {
        name: "Artists",
        href: "/artists",
        icon: User,
      },
    ],
  },
  {
    title: "Library",
    items: [
      {
        name: "Recently",
        href: "/recently",
        icon: HistoryIcon,
      },
      {
        name: "Playlists",
        href: "/playlists",
        icon: ListMusic,
      },
      {
        name: "Favorites",
        href: "/favorites",
        icon: Heart,
      },
      {
        name: "Creations",
        href: "/creations",
        icon: MicVocal,
      },
      {
        name: "Billing",
        href: "/billing",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        name: "Create Music",
        href: "/create",
        icon: Sparkles,
      },
    ],
  },
];
