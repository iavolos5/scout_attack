import { type NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;

  // let authenticated = false;

  // try {
  //   // Делаем запрос к бэку с текущими куками
  //   const res = await fetch("http://83.220.170.171/auth/check", {
  //     method: "GET",
  //     headers: {
  //       // Передаём куку из запроса middleware
  //       cookie: request.headers.get("cookie") || "",
  //     },
  //     cache: "no-store",
  //   });

  //   if (res.ok) {
  //     const data = await res.json();
  //     authenticated = data.authenticated === true;
  //   } else {
  //     console.error("Auth check failed:", res.status, await res.text());
  //   }
  // } catch (e) {
  //   console.error("Auth check error:", e);
  // }

  // // Редиректы в зависимости от аутентификации
  // if (pathname === "/") {
  //   return NextResponse.redirect(
  //     new URL(authenticated ? "/dashboard" : "/login", request.url)
  //   );
  // }

  // if (pathname.startsWith("/login")) {
  //   if (authenticated) {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }
  //   return NextResponse.next();
  // }

  // if (pathname.startsWith("/dashboard")) {
  //   if (!authenticated) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  //   return NextResponse.next();
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
