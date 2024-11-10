'use client'
import type { FC } from 'react'
import type { TEditableField } from '@type/form'
import type { AdditionalProps } from '@type/common'

import EditableField from '@common/editable-field/editable-field'
import { LinkButton } from '@common/button/button'

import classNames from 'classnames'
import classes from './editable-field-list.module.css'

type TEditableFieldsForm = { fields: TEditableField[]; submitText: string }

const EditableFieldList: FC<AdditionalProps<TEditableFieldsForm>> = ({ fields, submitText, className }) => {
    return (
        <form className={classNames(classes.form, className)}>
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

            <LinkButton title={submitText} />
        </form>
    )
}

export default EditableFieldList
