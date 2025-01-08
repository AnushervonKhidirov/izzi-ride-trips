import type { FC, MouseEvent } from 'react'
import type { OutlinedInputProps, TextFieldProps } from '@mui/material'
import type { TAutocompleteOption, TFormElement } from '@type/form'

import { useState } from 'react'
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Autocomplete,
    TextField,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

import ImagePicker from '@common/image-picker/image-picker'

export const Input: FC<TFormElement> = ({ name, type = 'text', options, label, placeholder, required, className }) => {
    const inputsWithoutLabel = ['date']

    const InputVariants: { [key: string]: FC<any> } = {
        password: PasswordInput,
        image: ImagePicker,
        date: DateTimePicker,
        default: OutlinedInput,
    }

    if (options) return <SelectAutocomplete name={name} label={label} required={required} options={options} />

    const Input: FC<TextFieldProps> = type in InputVariants ? InputVariants[type] : InputVariants.default

    return (
        <FormControl className={className}>
            {!inputsWithoutLabel.includes(type) && (
                <InputLabel size="small" htmlFor={name} style={{ fontSize: '1em' }}>
                    {required ? `${label} *` : label}
                </InputLabel>
            )}
            <Input
                size="small"
                id={name}
                name={name}
                type={type}
                label={label}
                required={required}
                placeholder={placeholder}
                style={{ fontSize: '1em' }}
            />
        </FormControl>
    )
}

export const PasswordInput: FC<OutlinedInputProps> = ({ size, name, label, required, style }) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword(show => !show)

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return (
        <OutlinedInput
            name={name}
            type={showPassword ? 'text' : 'password'}
            label={label}
            required={required}
            size={size}
            style={style}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        style={{ fontSize: '1.5em' }}
                    >
                        {showPassword ? (
                            <VisibilityOff fontSize={size} style={{ fontSize: '1em' }} />
                        ) : (
                            <Visibility fontSize={size} style={{ fontSize: '1em' }} />
                        )}
                    </IconButton>
                </InputAdornment>
            }
        />
    )
}

export const DateTimePicker: FC<OutlinedInputProps> = ({ size, name, label, required, style }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['MuiDateTimePicker']}>
                <MuiDateTimePicker
                    label={label}
                    name={name}
                    slotProps={{
                        textField: {
                            size,
                            required,
                            style,
                        },
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    )
}

export const SelectAutocomplete: FC<TextFieldProps & { options: TAutocompleteOption[] }> = ({
    name,
    label,
    options,
    required,
    className,
}) => {
    return (
        <Autocomplete
            size="small"
            id={name}
            options={options}
            className={className}
            sx={{ '& * ': { fontSize: '1em !important' } }}
            renderInput={params => <TextField {...params} required={required} label={label} />}
        />
    )
}
