import type { TextFieldProps } from '@mui/material'

export const logInInputs: TextFieldProps[] = [
    {
        name: 'username',
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

export const createCarInputs: TextFieldProps[] = [
    {
        name: 'brand',
        type: 'text',
        label: 'Brand',
        required: true,
    },
    {
        name: 'model',
        type: 'text',
        label: 'Model',
    },
    {
        name: 'type',
        type: 'text',
        label: 'Type',
    },
    {
        name: 'seats',
        type: 'number',
        label: 'Seats',
        required: true,
    },
    {
        name: 'year',
        type: 'number',
        label: 'Year',
    },
    {
        name: 'plate',
        type: 'text',
        label: 'Plate',
        required: true,
    },
    {
        name: 'image',
        type: 'file',
    },
]
