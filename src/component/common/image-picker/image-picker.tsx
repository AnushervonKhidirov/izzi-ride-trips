import type { FC, ChangeEvent } from 'react'
import type { TextFieldProps } from '@mui/material'

import { useRef, useState } from 'react'

import Image from 'next/image'
import { LinkButton } from '@common/button/button'

import classNames from 'classnames'
import classes from './image-picker.module.css'

const ImagePicker: FC<TextFieldProps> = ({ id, name, placeholder, required }) => {
    console.log('placeholder', placeholder)

    const inputRef = useRef<HTMLInputElement>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const [filePath, setFilePath] = useState<string>(placeholder ?? '')

    function choseFile() {
        inputRef.current?.click()
    }

    function getFileData(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (!files) return

        console.log(files[0])

        setFileName(files[0].name)
        setFilePath(URL.createObjectURL(files[0]))
    }

    return (
        <div className={classes.image_field}>
            <LinkButton title="Add Car Image" onClick={choseFile} className={classes.image_btn} />
            {fileName && <div className={classes.image_name}>File name: {fileName}</div>}
            <Image
                src={filePath}
                width={100}
                height={100}
                alt="image"
                className={classNames(classes.image, {
                    [classes.placeholder]: !fileName,
                })}
            />

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

export default ImagePicker
