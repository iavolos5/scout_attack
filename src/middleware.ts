import { type NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const session = request.cookies.get('session_id')?.value

	// Если зашли на /
	if (pathname === '/') {
		if (session) {
			return NextResponse.redirect(new URL('/dashboard', request.url))
		} else {
			return NextResponse.redirect(new URL('/login', request.url))
		}
	}

	// Если страница логина
	if (pathname.startsWith('/login')) {
		if (session) {
			return NextResponse.redirect(new URL('/dashboard', request.url))
		}
		return NextResponse.next()
	}

	// Если страница дашборда
	if (pathname.startsWith('/dashboard')) {
		if (!session) {
			return NextResponse.redirect(new URL('/login', request.url))
		}
		return NextResponse.next()
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/', '/login', '/dashboard/:path*']
}
