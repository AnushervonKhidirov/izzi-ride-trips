'use client'
import type { FC } from 'react'
import type { TextFieldProps } from '@mui/material'
import type { TForm } from '@type/form'


import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import { FormBtn } from '@common/button/button'
import { PasswordInput } from '@common/input/input'
import ImagePicker from '@common/image-picker/image-picker'

import classNames from 'classnames'
import classes from './form.module.css'

const Form: FC<TForm> = ({ inputs, className, loading = false, buttonText = 'submit', children, submitFunc }) => {
    return (
        <form onSubmit={submitFunc} className={classNames(classes.form, className)}>
            {inputs.map(input => (
                <Field
                    key={input.name}
                    type={input.type}
                    name={input.name}
                    label={input.label}
                    placeholder={input.placeholder}
                    required={input.required}
                />
            ))}

            <FormBtn loading={loading} title={buttonText} />

            <div className={classes.additional_content}>{children}</div>
        </form>
    )
}

const Field: FC<TextFieldProps> = ({ name, type = 'text', label, placeholder, required }) => {
    const InputVariants: { [key: string]: FC } = {
        password: PasswordInput,
        image: ImagePicker,
        default: OutlinedInput,
    }

    const Input: FC<TextFieldProps> = type in InputVariants ? InputVariants[type] : InputVariants.default

    return (
        <FormControl className={classes.field}>
            <InputLabel size="small" htmlFor={name} style={{ fontSize: '1em' }}>
                {required ? `${label} *` : label}
            </InputLabel>
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

export default Form
