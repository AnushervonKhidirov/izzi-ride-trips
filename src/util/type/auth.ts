export type TUser = {
    id: number
    role_id: number
    username: string
    phone: string
    first_name?: string
    last_name?: string
    email?: string
}

export type TTokens = {
    access_token: string
    refresh_token: string
}

export type TLogInData = {
    username: string
    password: string
}
