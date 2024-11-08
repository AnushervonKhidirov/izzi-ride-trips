import type { NextMiddleware } from 'next/server'

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { getUserWithRefresh } from '../../api/auth-api'
import { Headers } from '@constant/headers'
import { Page } from '@constant/links'
import { Token } from '../../util/constant/auth'

export function authMiddleware(nextMiddleware: NextMiddleware): NextMiddleware {
    return async (request, event) => {
        const cookieStore = cookies()

        const accessToken = cookieStore.get(Token.AccessKey)?.value
        const refreshToken = cookieStore.get(Token.RefreshKey)?.value

        if (accessToken && refreshToken) {
            const [user, err] = await getUserWithRefresh({
                accessToken: accessToken,
                refreshToken: refreshToken,
            })

            if (err) return NextResponse.redirect(new URL(Page.LogIn, request.url))

            request.headers.set(Headers.User, JSON.stringify(user))
        }

        return nextMiddleware(request, event)
    }
}
