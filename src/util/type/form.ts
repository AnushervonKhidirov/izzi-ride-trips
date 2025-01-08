import type { FormEvent, ReactNode } from 'react'
import type { TextFieldProps } from '@mui/material'

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

export type TFormElement = TextFieldProps & {
    options?: TAutocompleteOption[]
}

export type TAutocompleteOption = {
    id: number
    label: string
}