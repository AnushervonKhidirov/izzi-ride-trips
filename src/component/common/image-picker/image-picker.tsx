import type { FC, ChangeEvent } from 'react'
import type { TextFieldProps } from '@mui/material'
import type { AdditionalProps } from '@type/common'

import { useRef, useState } from 'react'

import Image from 'next/image'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import { Button } from '@common/button/button'

import classNames from 'classnames'
import classes from './image-picker.module.css'

type TImagePicker = TextFieldProps & {
    formPart?: boolean
}

const ImagePicker: FC<AdditionalProps<TImagePicker>> = ({ id, name, placeholder, required, formPart = true }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const [filePath, setFilePath] = useState<string>(placeholder ?? '')

    function choseFile() {
        inputRef.current?.click()
    }

    function getFileData(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (!files) return

        setFileName(files[0].name)
        setFilePath(URL.createObjectURL(files[0]))
    }

    return (
        <div
            className={classNames(
                classes.image_field,
                { [classes.form_field]: formPart },
                { [classes.editable_mode]: !formPart },
            )}
        >
            {formPart ? (
                <Button title="Add Car Image" onClick={choseFile} className={classes.image_btn} />
            ) : (
                <IconButton onClick={choseFile} className={classes.image_btn}>
                    <EditIcon />
                </IconButton>
            )}
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
