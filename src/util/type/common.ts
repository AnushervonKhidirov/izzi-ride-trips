import type { PropsWithChildren } from 'react'

export type AdditionalProps<T> = T &
    PropsWithChildren & {
        className?: string
    }

export type TProperty = {
    key: string
    name: string
    value: string | number
}
