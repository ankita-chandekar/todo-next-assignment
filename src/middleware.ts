import { NextRequest, NextResponse } from "next/server";
import { parseAuthCookie, verifyToken } from "./utils/jwt";

export async function middleware(req: NextRequest) {
  console.log("middleware console");
  console.log("Middleware triggered for:", req.nextUrl.pathname);
  const token = parseAuthCookie(req.headers.get("cookie") || undefined);

  console.log("token", token);

  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
  // const payload = verifyToken(token);
  // console.log("payload", payload);
  // if (!payload) {
  //   const response = NextResponse.redirect(new URL("/login", req.url));
  //   response.cookies.delete("authToken");
  //   return response;
  // } else {
  //   if (token && payload !== null) {
  //     return NextResponse.redirect("/todo");
  //   }
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ["/todo/:path*", "/create-todo/:path*"],
};
