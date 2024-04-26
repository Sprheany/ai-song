"use client";

import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants/sidebar-links";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  onNavClick?: () => void;
  className?: string;
};

const Sidebar = ({ className, onNavClick }: Props) => {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12 overflow-y-auto", className)}>
      <nav className="flex flex-col space-y-4 py-4">
        {sidebarLinks.map((group) => (
          <div key={group.title} className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {group.title}
            </h2>
            <div className="space-y-1">
              {group.items.map((item) => (
                <Button
                  key={item.name}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={onNavClick}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
