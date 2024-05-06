import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { UserButton } from "@clerk/nextjs";
import LoginButton from "./login-button";
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
        <LoginButton>
          <UserButton />
        </LoginButton>
      </div>
    </div>
  );
};

export default Header;
