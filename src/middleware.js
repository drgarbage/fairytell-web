// middleware.js
import { NextResponse } from "next/server";

const COOKIE_NAME = "ageVerified18";
const COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 365; // 1 年

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // 不要讓 middleware 自己攔截 age-gate 頁面，否則會無限重導
  if (pathname.startsWith("/age-gate") || pathname.startsWith("/safe")) {
    return NextResponse.next();
  }

  // 檢查 cookie
  const verified = req.cookies.get(COOKIE_NAME)?.value === "true";
  if (verified) return NextResponse.next();

  // 尚未驗證 -> 導去 /age-gate
  const url = req.nextUrl.clone();
  url.pathname = "/age-gate";
  url.searchParams.set("redirect", pathname || "/");
  return NextResponse.redirect(url);
}

export const config = {
  // matcher 設成根目錄起跳，攔截整個網站
  matcher: ["/((?!_next|favicon.ico|public).*)"],
};
