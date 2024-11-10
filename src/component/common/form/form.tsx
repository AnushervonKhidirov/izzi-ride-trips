'use client'
import type { ChangeEvent, FC } from 'react'
import type { TextFieldProps } from '@mui/material'
import type { TForm } from '@type/form'

import { useRef, useState } from 'react'

import Image from 'next/image'
import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import { FormBtn, LinkButton } from '@common/button/button'
import { PasswordInput } from '@common/input/input'

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
                    required={input.required}
                />
            ))}

            <FormBtn loading={loading} title={buttonText} />

            <div className={classes.additional_content}>{children}</div>
        </form>
    )
}

const Field: FC<TextFieldProps> = ({ name, type = 'text', label, required }) => {
    const InputVariants: { [key: string]: FC } = {
        password: PasswordInput,
        file: FilePicker,
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
                style={{ fontSize: '1em' }}
            />
        </FormControl>
    )
}

const FilePicker: FC<TextFieldProps> = ({ id, name, required }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const [filePath, setFilePath] = useState<string | null>(null)

    function choseFile() {
        inputRef.current?.click()
    }

    function getFileData(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (!files) return

        console.log(files[0]);
        

        setFileName(files[0].name)
        setFilePath(URL.createObjectURL(files[0]))
    }

    return (
        <div className={classes.file_field}>
            <LinkButton title="Add Car Image" onClick={choseFile} className={classes.file_btn} />
            {fileName && <div className={classes.file_name}>File name: {fileName}</div>}
            {filePath && <Image src={filePath} width={100} height={100} alt="image" className={classes.image}></Image>}

            <input
                id={id}
                name={name}
                required={required}
                ref={inputRef}
                type="file"
                accept="image"
                onChange={e => getFileData(e)}
                className={classes.file_input}
            />
        </div>
    )
}

export default Form
