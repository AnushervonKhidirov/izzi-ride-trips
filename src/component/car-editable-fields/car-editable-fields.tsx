import type { FC, FormEvent } from 'react'
import type { TCar } from '@type/car'

import { useState } from 'react'

import EditableField from '@common/editable-field/editable-field'
import { FormBtn } from '@common/button/button'

import carImage from '@public/images/car.png'
import Car from '@service/car/car'

import classes from './car-editable-fields.module.css'
import ImagePicker from '@common/image-picker/image-picker'

const CarEditableFields: FC<{ carData: TCar }> = ({ carData }) => {
    const [loading, setLoading] = useState(false)

    const car = new Car(carData)
    const fields = car.getEditableFields()

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const body = Object.fromEntries(formData)

        setLoading(false)

        console.log('body', body)
    }

    return (
        <form onSubmit={onSubmit} className={classes.form}>
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

            <FormBtn title="Save changes" loading={loading} />
        </form>
    )
}

export default CarEditableFields
