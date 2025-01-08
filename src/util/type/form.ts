import type { FormEvent, ReactNode } from 'react'
import type { TextFieldProps } from '@mui/material'
import type { TAutocompleteOption } from '@common/input/input'

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