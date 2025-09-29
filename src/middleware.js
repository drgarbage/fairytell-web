import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // 放行這幾頁，避免自我重導
  if (pathname.startsWith("/age-gate") || pathname.startsWith("/safe")) {
    return NextResponse.next();
  }

  // 讀 __session
  const session = req.cookies.get("__session")?.value || "";
  const isAdult = session.includes("age18=1");

  if (isAdult) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/age-gate";
  url.searchParams.set("redirect", pathname || "/");
  return NextResponse.redirect(url);
}

export const config = {
  // 攔全站但排除 Next 靜態資源
  matcher: ["/((?!_next|favicon.ico).*)"],
};
