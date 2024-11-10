import type { FC, FormEvent } from 'react'
import type { TCar } from '@type/car'

import EditableFieldList from '@common/editable-field-list/editable-field-list'

import Car from '@service/car/car'

const CarEditableFields: FC<{ carData: TCar }> = ({ carData }) => {
    const car = new Car(carData)
    const fields = car.getEditableFields()

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        console.log('working mtf!!');
        
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const body = Object.fromEntries(formData)

        console.log('body', body)
    }

    return <EditableFieldList fields={fields} onSubmit={onSubmit} submitText="Save Changes" />
}

export default CarEditableFields
