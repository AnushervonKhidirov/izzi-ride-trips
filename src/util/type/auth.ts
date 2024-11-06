export type TUser = {
    id: number
    username: string
    firstName: string
    lastName: string
    email: string
    phone: string
}

export type TTokens = {
    accessToken: string
    refreshToken: string
}

export type TLogInData = {
    username: string
    password: string
}
