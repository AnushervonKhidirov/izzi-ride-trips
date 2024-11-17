import type { FormEvent, ReactNode } from 'react'

export type TForm = {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
    children: ReactNode
    className?: string
}

export type TEditableField = {
    title: string
    name: string
    value: string | number
    editing?: boolean
    editable?: boolean
}
