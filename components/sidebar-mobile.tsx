import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "./logo";
import Sidebar from "./sidebar";

const SidebarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <div className="px-6 py-4">
            <Logo />
          </div>
        </SheetHeader>
        <Sidebar className="h-full" />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
