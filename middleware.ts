import {
  clerkMiddleware,
  createRouteMatcher,
  authMiddleware,
} from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/recently",
  "/playlists",
  "/favorites",
  "/creations",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
