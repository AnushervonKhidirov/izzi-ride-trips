import type { TextFieldProps } from '@mui/material'

import carImage from '@public/images/car.png'

export const addCarInputs: TextFieldProps[] = [
    {
        name: 'image',
        type: 'image',
        placeholder: carImage.src,
    },
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
]
