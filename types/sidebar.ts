import { LucideIcon } from "lucide-react";

export type SidebarGroup = {
  title: string;
  items: SidebarLink[];
};

export type SidebarLink = {
  name: string;
  href: string;
  icon: LucideIcon;
};
