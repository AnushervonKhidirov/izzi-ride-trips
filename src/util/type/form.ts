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
    defaultValue?: TDefaultValue
}

export type TAutocompleteOption = {
    id: number
    label: string
    [key: string]: string | number
}

export type TDefaultFormElementData = {
    name: string
    value: TDefaultValue
}

export type TDefaultValue = string | number | boolean | TAutocompleteOption

export type TResponse<T = {}> = {
    code: number
    show_custom_message: boolean
    message: string
    data?: T
}
