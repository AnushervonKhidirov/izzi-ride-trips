'use client'
import type { FC } from 'react'
import type { TEditableField } from '@type/form'

import { useState } from 'react'

import classes from './editable-field.module.css'
import { Input } from '@mui/material'

const EditableField: FC<TEditableField> = ({ title, name, value, editing, editable = true }) => {
    const [fieldValue, setFieldValue] = useState(value)

    return (
        <div className={classes.editable_field}>
            <div className={classes.title}>{title}:</div>

            {editable ? (
                <Input
                    className={classes.value}
                    name={name}
                    value={fieldValue}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldValue(event.target.value)}
                    readOnly={!editing}
                    disableUnderline={!editing}
                    style={{
                        fontSize: '1em',
                        fontFamily: 'inherit',
                        fontWeight: 'inherit',
                    }}
                    sx={{ '& > input': { padding: 0 } }}
                />
            ) : (
                <div className={classes.value}>{value}</div>
            )}
        </div>
    )
}

export default EditableField
