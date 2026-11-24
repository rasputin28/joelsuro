import { NextResponse, type NextRequest } from "next/server";

// El español vive en la raíz (joelsuro.com); /en y /zh son prefijos.
// Todo lo que no trae prefijo se sirve internamente como /es sin cambiar la URL.
const PREFIXED = ["en", "zh", "es"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (PREFIXED.includes(first)) {
    // /es explícito → redirige a la raíz para no duplicar contenido
    if (first === "es") {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(/^\/es/, "") || "/";
      return NextResponse.redirect(url, 308);
    }
    return;
  }
  const url = request.nextUrl.clone();
  url.pathname = `/es${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
