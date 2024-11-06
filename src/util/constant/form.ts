import type { TextFieldProps } from '@mui/material'

export const logInInputs: TextFieldProps[] = [
    {
        name: 'username',
        type: 'text',
        label: 'login',
        required: true,
    },
    {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
    },
]
