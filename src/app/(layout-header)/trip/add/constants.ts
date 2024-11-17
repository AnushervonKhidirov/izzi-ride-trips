import type { TextFieldProps } from '@mui/material'

export const addTripInputs: TextFieldProps[] = [
    {
        name: 'from',
        type: 'text',
        label: 'From',
        required: true,
    },
    {
        name: 'to',
        type: 'text',
        label: 'To',
        required: true,
    },
    {
        name: 'departure_time',
        type: 'date',
        label: 'Departure Time',
        required: true,
    },
    {
        name: 'arrival_time',
        type: 'date',
        label: 'Arrival Time',
        required: true,
    },
    {
        name: 'number_of_seats',
        type: 'number',
        label: 'Number of Seats',
        required: true,
    },
    {
        name: 'payment_method',
        type: 'text',
        label: 'Payment Method',
    },
    {
        name: 'price',
        type: 'number',
        label: 'Price',
        required: true,
    },
]
