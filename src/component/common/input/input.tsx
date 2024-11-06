import type { FC, MouseEvent } from 'react'
import type { OutlinedInputProps } from '@mui/material'

import { useState } from 'react'
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

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
