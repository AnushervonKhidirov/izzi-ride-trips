import type { FC } from 'react'
import type { TCar } from '@type/car'

import EditableFieldList from '@common/editable-field-list/editable-field-list'

import Car from '@service/car/car'

const CarEditableFields: FC<{ carData: TCar }> = ({ carData }) => {
    const car = new Car(carData)
    const fields = car.getEditableFields()

    return <EditableFieldList fields={fields} submitText="Save Changes" />
}

export default CarEditableFields
