import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) => { res.cookies.set(name, value, options) },
        remove: (name, options) => { res.cookies.delete(name) }
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const isAuthPage   = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')
  const isAdminPage  = req.nextUrl.pathname.startsWith('/admin')
  const isProtected  = req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/exam')

  // Redirect ke login jika belum login dan akses halaman protected
  if (!session && (isProtected || isAdminPage)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Redirect ke dashboard jika sudah login dan akses halaman auth
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Cek role admin untuk halaman /admin
  if (session && isAdminPage) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/exam/:path*', '/admin/:path*', '/login', '/register'],
}