import type { ErrorCustom } from '@type/error'
import type { TUser, TTokens, TLogInData, TResponse } from '@type/auth'

import axios from 'axios'

import { Endpoint, Token } from '@constant/request'

type RequestFunc<T, U> = (data: T) => Promise<[null, ErrorCustom<Response>] | [U, null]>
type TLogInResponse = TResponse<TTokens>

export default class Auth {
    logIn: RequestFunc<TLogInData, TTokens> = async body => {
        try {
            const response = await axios.post<TLogInResponse>(Endpoint.LogIn, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.status !== 200 || !response.data.data) {
                throw new Error(response.data.message, {
                    cause: response,
                })
            }

            const { access_token, refresh_token }: TTokens = response.data.data

            return [{ access_token, refresh_token }, null]
        } catch (err: any) {
            return [null, err]
        }
    }

    getUser: RequestFunc<string | undefined, TUser> = async token => {
        if (!token) return [null, new Error('token is not provided')]

        try {
            const response = await axios.get<TResponse<TUser>>(Endpoint.UserInfo, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.status !== 200 || !response.data.data) {
                throw new Error(response.data.message, {
                    cause: response,
                })
            }

            return [response.data.data, null]
        } catch (err: any) {
            return [null, err]
        }
    }

    refreshTokens: RequestFunc<string | undefined, TTokens> = async refresh_token => {
        if (!refresh_token) return [null, new Error('token is not provided')]

        try {
            const response = await axios.post<TResponse<TTokens>>(
                Endpoint.RefreshToken,
                { token: refresh_token },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )

            if (response.status !== 200 || !response.data.data) {
                throw new Error("Can't refresh token, pleas sign in again", {
                    cause: response,
                })
            }

            return [response.data.data, null]
        } catch (err: any) {
            return [null, err]
        }
    }

    getUserWithRefresh: RequestFunc<TTokens, TUser> = async tokens => {
        const [user, userErr] = await this.getUser(tokens.access_token)

        if (userErr) {
            if (userErr.cause && userErr.cause.status === Number(Token.ExpiredCode)) {
                const [updatedTokens, tokenErr] = await this.refreshTokens(tokens.refresh_token)

                if (tokenErr) return [null, tokenErr]

                const [user, err] = await this.getUser(updatedTokens.access_token)

                if (err) return [null, err]
                return [user, null]
            }

            return [null, userErr]
        }

        return [user, null]
    }
}
