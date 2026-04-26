export { middleware } from '@/lib/middleware'

export const config = {
  matcher: ['/dashboard/:path*', '/exam/:path*', '/admin/:path*', '/login', '/register'],
}