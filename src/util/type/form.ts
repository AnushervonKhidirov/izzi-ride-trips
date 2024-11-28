import type { FormEvent, ReactNode } from 'react'

export type TFormSubmit = (event: FormEvent<HTMLFormElement>) => void

export type TForm = {
    onSubmit: TFormSubmit
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
