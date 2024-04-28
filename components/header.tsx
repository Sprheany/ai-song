import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
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
        <ClerkLoading>
          <Loader className="h5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant="default">Login</Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </div>
  );
};

export default Header;
