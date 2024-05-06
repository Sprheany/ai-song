import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const LoginButton = ({ children, className }: Props) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <ClerkLoading>
        <Loader className="h5 w-5 text-muted-foreground animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>{children}</SignedIn>
        <SignedOut>
          <SignInButton>
            <Button variant="default" type="button" className="w-full">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </div>
  );
};

export default LoginButton;
