import type { ChangeEvent, FC, MouseEvent, ReactNode } from 'react'
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
    Switch,
    FormControlLabel,
} from '@mui/material'
import { Visibility, VisibilityOff, Delete } from '@mui/icons-material'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

import Tooltip from '@common/tooltip/tooltip'
import ImagePicker from '@common/image-picker/image-picker'

import { Event } from '@constant/event'

import classes from './input.module.css'

export const Input: FC<TFormElement> = ({
    name,
    type = 'text',
    options,
    defaultValue,
    defaultChecked,
    disabled,
    label,
    placeholder,
    required,
    className,
}) => {
    const inputsWithoutLabel = ['date', 'checkbox']

    const InputVariants: { [key: string]: FC<any> } = {
        password: PasswordInput,
        image: ImagePicker,
        date: DateTimePicker,
        checkbox: SwitchInput,
        default: OutlinedInput,
    }

    if (options) {
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
    }

    if (type === 'color' && (typeof defaultValue === 'string' || typeof defaultValue === 'undefined')) {
        return <ColorPickerWithLabel label={label} name={name} defaultValue={defaultValue} />
    }

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
                defaultChecked={defaultChecked}
                defaultValue={defaultValue}
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

export const SwitchInput: FC<TFormElement> = ({ name, label, defaultChecked }) => {
    return (
        <FormControlLabel
            sx={{ '& * ': { fontSize: '1em !important' } }}
            label={label}
            control={<Switch name={name} defaultChecked={defaultChecked} />}
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

export const ColorPickerWithLabel: FC<{ label: ReactNode; name?: string; defaultValue?: string }> = ({
    label,
    name,
    defaultValue,
}) => {
    const nullColorValue = '#00000000'
    const [color, setColor] = useState(defaultValue ?? nullColorValue)
    const newLabel =
        color === nullColorValue ? (
            <span>{label} (not selected)</span>
        ) : (
            <span className={classes.color_label}>
                {label}
                <Tooltip title="Clear">
                    <Delete onClick={clearColor} onMouseDown={clearColor} sx={{ verticalAlign: 'center' }} />
                </Tooltip>
            </span>
        )

    function colorHandler(e: ChangeEvent<HTMLInputElement>) {
        setColor(e.currentTarget.value)
    }

    function clearColor() {
        setColor(nullColorValue)
    }

    return (
        <FormControlLabel
            style={{ margin: 0, gap: '0.6em' }}
            sx={{ '& * ': { fontSize: '1em !important' } }}
            label={newLabel}
            control={<ColorPicker name={name} value={color} onChange={colorHandler} />}
        />
    )
}

export const ColorPicker: FC<{
    name?: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}> = ({ name, value, onChange }) => {
    return (
        <div className={classes.color_picker}>
            <div className={classes.color_wrapper}>
                <div className={classes.color_value} style={{ backgroundColor: value }}></div>
            </div>

            <input className={classes.color_input} value={value} type="color" onChange={onChange} />
            <input className={classes.color_input} type="text" value={value} name={name} readOnly />
        </div>
    )
}
