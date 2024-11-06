import type { NextMiddleware } from 'next/server'
import type { TUser } from '@type/auth'

import { NextResponse } from 'next/server'

import { Page } from '@constant/links'
import { Headers } from '@constant/headers'

export function protectedRouteMiddleware(nextMiddleware: NextMiddleware): NextMiddleware {
    return async (request, event) => {
        const pathname = request.nextUrl.pathname
        const userJson = request.headers.get(Headers.User)

        const unAuthPage = pathname === Page.LogIn
        const user = userJson ? (JSON.parse(userJson) as TUser) : null

        if (!unAuthPage && !user) return NextResponse.redirect(new URL(Page.LogIn, request.url))
        if (pathname === '/') return NextResponse.redirect(new URL(Page.Cars, request.url))

        return nextMiddleware(request, event)
    }
}
