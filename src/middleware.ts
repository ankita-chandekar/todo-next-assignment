import { NextRequest } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./../i18nConfig";

export async function middleware(req: NextRequest) {
  console.log("middleware console");
  console.log("Middleware triggered for:", req.nextUrl.pathname);

  return i18nRouter(req, i18nConfig);
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
