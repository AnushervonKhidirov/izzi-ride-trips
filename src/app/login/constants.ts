import { TextFieldProps } from '@mui/material'

export const logInInputs: TextFieldProps[] = [
    {
        name: 'login',
        type: 'text',
        label: 'Login',
        required: true,
    },
    {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
    },
]
