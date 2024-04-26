"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import Logo from "./logo";
import Sidebar from "./sidebar";

const SidebarMobile = () => {
  const [open, onOpenChange] = useState(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <Button
            variant={"link"}
            className="px-6 py-4 justify-start"
            onClick={() => onOpenChange(false)}
          >
            <Logo />
          </Button>
        </SheetHeader>
        <Sidebar className="h-full" onNavClick={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
