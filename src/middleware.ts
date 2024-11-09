import { middlewareChain } from '@middleware/chain'
import { authMiddleware } from '@middleware/auth'
import { protectedRouteMiddleware } from '@middleware/protected-route'

export default middlewareChain([authMiddleware, protectedRouteMiddleware])

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
