import type { ErrorCustom } from '@type/error'
import type { TUser, TTokens, TLogInData } from '@type/auth'

import axios from 'axios'

import { Endpoint, Token } from '@constant/request'

type RequestFunc<T, U> = (data: T) => Promise<[null, ErrorCustom<Response>] | [U, null]>
type TLogInResponse = TUser & TTokens

export default class Auth {
    logIn: RequestFunc<TLogInData, TTokens> = async body => {
        try {
            const response = await axios.post<TLogInResponse>(Endpoint.LogIn, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.status !== 200) {
                throw new Error('Cant sign in, check entered data or join', {
                    cause: response,
                })
            }

            const { accessToken, refreshToken }: TTokens = response.data

            return [{ accessToken, refreshToken }, null]
        } catch (err: any) {
            return [null, err]
        }
    }

    getUser: RequestFunc<string | undefined, TUser> = async token => {
        if (!token) return [null, new Error('token is not provided')]

        try {
            const response = await axios.get(Endpoint.User, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.status !== 200) {
                throw new Error("Can't get user, try to refresh token", {
                    cause: response,
                })
            }

            return [response.data, null]
        } catch (err: any) {
            return [null, err]
        }
    }

    refreshTokens: RequestFunc<string | undefined, TTokens> = async refreshToken => {
        if (!refreshToken) return [null, new Error('token is not provided')]

        try {
            const response = await axios.post(
                Endpoint.RefreshToken,
                { refreshToken },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )

            if (response.status !== 200) {
                throw new Error("Can't refresh token, pleas sign in again", {
                    cause: response,
                })
            }

            return [response.data, null]
        } catch (err: any) {
            return [null, err]
        }
    }

    getUserWithRefresh: RequestFunc<TTokens, TUser> = async tokens => {
        const [user, userErr] = await this.getUser(tokens.accessToken)

        if (userErr) {
            if (
                userErr.cause &&
                userErr.cause.status === Number(Token.ExpiredCode) &&
                userErr.cause.statusText === Token.ExpiredText
            ) {
                const [updatedTokens, tokenErr] = await this.refreshTokens(tokens.refreshToken)

                if (tokenErr) return [null, tokenErr]

                const [user, err] = await this.getUser(updatedTokens.accessToken)

                if (err) return [null, err]
                return [user, null]
            }

            return [null, userErr]
        }

        return [user, null]
    }
}
