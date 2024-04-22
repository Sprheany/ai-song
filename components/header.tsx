import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Button } from "@/components/ui/button";
import Logo from "./logo";
import SidebarMobile from "./sidebar-mobile";

const Header = () => {
  return (
    <div className="z-50 w-full flex items-center justify-between border-b px-6 py-4">
      <div className="flex space-x-4">
        <div className="block lg:hidden">
          <SidebarMobile />
        </div>
        <div className="hidden lg:block">
          <Logo />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeModeToggle />
        <Button variant="default">Login</Button>
      </div>
    </div>
  );
};

export default Header;
