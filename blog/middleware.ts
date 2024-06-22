import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/', '/api/webhooks/clerk', '/api/webhooks/stripe']);

export default clerkMiddleware((auth, request) => {
  console.log('Request URL:', request.url);
  console.log('Is Public Route:', isPublicRoute(request));

  if (!isPublicRoute(request)) {
    console.log('Protecting Route:', request.url);
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};