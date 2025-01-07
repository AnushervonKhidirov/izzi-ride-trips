import type { HTMLAttributes, PropsWithChildren } from 'react'

export type AdditionalProps<T> = T &
    PropsWithChildren & {
        className?: string
    }

export type TProperty = {
    name: string
    value: string | number
}

export type TChip = {
    name: string
    value: boolean
}

export type TStyles = HTMLAttributes<HTMLElement>['style']
