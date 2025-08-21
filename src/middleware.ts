import { type NextRequest, NextResponse } from "next/server";
/*4. Пример

Если кука установлена так:

Set-Cookie: token=abc123; Secure; HttpOnly; Path=/; SameSite=Lax


На https://example.com/dashboard middleware увидит её.

На http://localhost/dashboard — не увидит (из-за Secure).

На другом сайте — не придёт (из-за SameSite=Lax).

💡 Вывод: да, ты можешь видеть токен в middleware при HTTPS, даже если кука Secure и HttpOnly.*/

export default function middleware(request: NextRequest) {
  // const { cookies } = request;
  // const token = cookies.get("token")?.value;
  // const { pathname } = new URL(request.url);
  // console.log(token);

  // // Проверка токена и текущего пути
  // if (token) {
  //   if (
  //     pathname.startsWith("/dashboard") ||
  //     pathname.startsWith("/reports") ||
  //     pathname.startsWith("/profile") ||
  //     pathname.startsWith("/emails") ||
  //     pathname.startsWith("/ssl") ||
  //     pathname.startsWith("/alike")
  //   ) {
  //     return NextResponse.next(); // пользователь на странице дашборда → пропускаем
  //   }
  //   // если залогинен, но на другой странице → редирект на /dashboard
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // } else {
  //   // пользователь не залогинен
  //   if (pathname === "/login") {
  //     return NextResponse.next(); // на странице логина → пропускаем
  //   }
  //   // если не залогинен и не на login → редирект на login
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/dashboard",
    "/reports",
    "/profile",
    "/emails",
    "/ssl",
    "/alike",
  ],
};
