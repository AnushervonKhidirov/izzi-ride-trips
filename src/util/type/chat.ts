import type { TUser } from './auth'

export type TChatInfo = {
    id: number | string
    firstName: TUser['firstName']
    lastName: TUser['lastName']
}

export type TChatMessage = {
    id: number | string
    userId: TUser['id']
    createdAt: Date
    text: string
}
