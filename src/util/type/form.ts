import type { FormEvent, ReactNode } from 'react'
import type { TextFieldProps } from '@mui/material'

export type TForm = {
    inputs: TextFieldProps[]
    submitFunc: (event: FormEvent<HTMLFormElement>) => void
    loading?: boolean
    buttonText?: string
    className?: string
    children?: ReactNode
}
