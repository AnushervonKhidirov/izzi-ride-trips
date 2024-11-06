import type { ErrorCustom } from '@type/error'
import type { TUser, TTokens, TLogInData } from '@type/auth'

import { Endpoint, Token } from '@constant/auth'

type RequestFunc<T, U> = (data: T) => Promise<[null, ErrorCustom<Response>] | [U, null]>
type TLogInResponse = TUser & TTokens

export const logIn: RequestFunc<TLogInData, TTokens> = async body => {
    try {
        const logInRequest = await fetch(Endpoint.LogIn, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!logInRequest.ok) {
            throw new Error('Cant sign in, check entered data or join', {
                cause: logInRequest,
            })
        }

        const data = (await logInRequest.json()) as TLogInResponse
        const { accessToken, refreshToken }: TTokens = data

        return [{ accessToken, refreshToken }, null]
    } catch (err: any) {
        return [null, err]
    }
}

export const getUser: RequestFunc<string | undefined, TUser> = async token => {
    if (!token) return [null, new Error('token is not provided')]

    try {
        const userRequest = await fetch(Endpoint.User, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!userRequest.ok) {
            throw new Error("Can't get user, try to refresh token", {
                cause: userRequest,
            })
        }

        const response = await userRequest.json()

        return [response, null]
    } catch (err: any) {
        return [null, err]
    }
}

export const refreshTokens: RequestFunc<string | undefined, TTokens> = async refreshToken => {
    if (!refreshToken) return [null, new Error('token is not provided')]

    try {
        const tokenRequest = await fetch(Endpoint.RefreshToken, {
            method: 'POST',
            body: JSON.stringify({
                refreshToken: refreshToken,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!tokenRequest.ok) {
            throw new Error("Can't refresh token, pleas sign in again", {
                cause: tokenRequest,
            })
        }

        const response = await tokenRequest.json()

        return [response, null]
    } catch (err: any) {
        return [null, err]
    }
}

export const getUserWithRefresh: RequestFunc<TTokens, TUser> = async tokens => {
    const [user, userErr] = await getUser(tokens.accessToken)

    if (userErr) {
        if (
            userErr.cause &&
            userErr.cause.status === Number(Token.ExpiredCode) &&
            userErr.cause.statusText === Token.ExpiredText
        ) {
            const [updatedTokens, tokenErr] = await refreshTokens(tokens.refreshToken)

            if (tokenErr) return [null, tokenErr]

            const [user, err] = await getUser(updatedTokens.accessToken)

            if (err) return [null, err]

            return [user, null]
        }

        return [null, userErr]
    }

    return [user, null]
}
