'use client'
import type { FC, FormEvent } from 'react'
import type { TEditableField } from '@type/form'
import type { AdditionalProps } from '@type/common'

import EditableField from '@common/editable-field/editable-field'
import ImagePicker from '@common/image-picker/image-picker'
import { LinkButton } from '@common/button/button'

import carImage from '@public/images/car.png'

import classNames from 'classnames'
import classes from './editable-field-list.module.css'

type TEditableFieldsForm = {
    fields: TEditableField[]
    submitText: string
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const EditableFieldList: FC<AdditionalProps<TEditableFieldsForm>> = ({ fields, onSubmit, submitText, className }) => {
    return (
        <form className={classNames(classes.form, className)} onSubmit={e => onSubmit(e)}>
            <ImagePicker name="image" placeholder={carImage.src} formPart={false} className={classes.image_picker} />

            {fields.map(field => {
                return (
                    <EditableField
                        title={field.title}
                        name={field.name}
                        value={field.value}
                        editable={field.editable}
                        editing={true}
                        key={field.name}
                    />
                )
            })}

            <LinkButton title={submitText} type="submit" />
        </form>
    )
}

export default EditableFieldList
