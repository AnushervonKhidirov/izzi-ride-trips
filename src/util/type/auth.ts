export type TUser = {
    id: number
    username: string
    email?: string
    phone: string
    first_name?: string
    last_name?: string
}

export type TTokens = {
    access_token: string
    refresh_token: string
}

export type TLogInData = {
    username: string
    password: string
}

export type TResponse<T> = {
    code: number
    show_custom_message: boolean
    message: string
    data?: T
}
