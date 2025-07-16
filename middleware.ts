// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import type { ClerkMiddlewareAuth, ClerkMiddlewareAuthObject } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";

// const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

// export default clerkMiddleware(async (auth: ClerkMiddlewareAuth, req: NextRequest) => {
//   const { userId }: ClerkMiddlewareAuthObject = await auth();
//   if (!isPublicRoute(req) && !userId) {
//     const signInUrl = new URL("/sign-in", req.url);
//     signInUrl.searchParams.set("redirect_url", req.url);
//     return NextResponse.redirect(signInUrl);
//   }
//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };






import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { ClerkMiddlewareAuth, ClerkMiddlewareAuthObject } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth: ClerkMiddlewareAuth, req: NextRequest) => {
  const { userId }: ClerkMiddlewareAuthObject = await auth();
  if (!isPublicRoute(req) && !userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};