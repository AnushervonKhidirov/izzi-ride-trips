import type { FC, MouseEvent } from 'react'
import type { OutlinedInputProps } from '@mui/material'
import type { TAutocompleteOption, TFormElement } from '@type/form'

import { useRef, useState } from 'react'
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

import { Event } from '@constant/event'

export const Input: FC<TFormElement> = ({
    name,
    type = 'text',
    options,
    defaultValue,
    disabled,
    label,
    placeholder,
    required,
    className,
}) => {
    const inputsWithoutLabel = ['date']

    const InputVariants: { [key: string]: FC<any> } = {
        password: PasswordInput,
        image: ImagePicker,
        date: DateTimePicker,
        default: OutlinedInput,
    }

    if (options)
        return (
            <SelectAutocomplete
                name={name}
                label={label}
                defaultValue={defaultValue}
                required={required}
                disabled={disabled}
                options={options}
            />
        )

    const Input: FC<TFormElement> = type in InputVariants ? InputVariants[type] : InputVariants.default

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
                disabled={disabled}
                name={name}
                type={type}
                label={label}
                required={required}
                placeholder={placeholder}
                value={defaultValue}
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

export const SelectAutocomplete: FC<TFormElement> = ({
    name,
    label,
    options = [],
    defaultValue,
    required,
    disabled,
    className,
}) => {
    const autocompleteRef = useRef<HTMLElement>(null)

    function triggerFormEvent(value: TAutocompleteOption) {
        if (!autocompleteRef.current) return

        const autocompleteEvent = new CustomEvent<TAutocompleteOption>(Event.Autocomplete, { detail: value })
        const formElement = autocompleteRef.current.parentElement
        formElement?.dispatchEvent(autocompleteEvent)
    }

    return (
        <Autocomplete
            size="small"
            id={name}
            options={options}
            ref={autocompleteRef}
            className={className}
            sx={{ '& * ': { fontSize: '1em !important' } }}
            disabled={disabled}
            defaultValue={typeof defaultValue === 'object' ? defaultValue : undefined}
            renderInput={params => <TextField {...params} name={name} required={required} label={label} />}
            renderOption={(props, option) => {
                return (
                    <li style={{ fontSize: '1.25em', padding: '0.5em 1em' }} {...props} key={option.id}>
                        {option.label}
                    </li>
                )
            }}
            onChange={(_, value) => {
                if (value) triggerFormEvent(value)
            }}
        />
    )
}
