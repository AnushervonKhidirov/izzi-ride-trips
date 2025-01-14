import type { TAutocompleteOption, TDefaultFormElementData, TFormElement } from '@type/form'
import type { ICarsForm, TCarManufacturer, TCarModel, TCarModelOption } from '@type/car'

import carImage from '@public/images/car.png'

export class CarForm implements ICarsForm {
    private readonly preferencesFields: string[]
    readonly defaultValues: TDefaultFormElementData[] | undefined
    defaultFormList: TFormElement[]

    constructor(defaultValues?: TDefaultFormElementData[]) {
        this.defaultValues = defaultValues
        this.preferencesFields = ['smoking', 'child_car_seat', 'animals', 'luggage']

        this.defaultFormList = [
            {
                name: 'image',
                type: 'image',
                placeholder: carImage.src,
            },
            {
                name: 'manufacturer',
                type: 'text',
                label: 'Manufacturer',
                options: [],
                required: true,
            },
            {
                name: 'model',
                type: 'text',
                label: 'Model',
                options: [],
                required: true,
            },
            {
                name: 'number_of_seats',
                type: 'number',
                label: 'Number of seats',
                required: true,
            },
            {
                name: 'year',
                type: 'number',
                label: 'Year',
                required: true,
            },
            {
                name: 'auto_number',
                type: 'text',
                label: 'Plate',
                required: true,
            },
            {
                name: 'smoking',
                type: 'checkbox',
                label: 'Smoking',
            },
            {
                name: 'child_car_seat',
                type: 'checkbox',
                label: 'Child car seat',
            },
            {
                name: 'animals',
                type: 'checkbox',
                label: 'Animals',
            },
            {
                name: 'luggage',
                type: 'checkbox',
                label: 'Luggage',
            },
        ]
    }

    updateFormList(list: TFormElement[], data: { name: string; value: TAutocompleteOption[] }) {
        return list.map(formListItem => {
            if (formListItem.name === data.name) {
                return {
                    ...formListItem,
                    options: data.value,
                }
            }

            return formListItem
        })
    }

    getPreferencesFields() {
        return this.preferencesFields
    }

    getManufacturersOptions(list: TCarManufacturer[]) {
        return list.map<TAutocompleteOption>(manufacturer => ({
            id: manufacturer.id,
            label: manufacturer.name,
        }))
    }

    getModelOptions(list: TCarModel[]) {
        return list.map<TCarModelOption>(model => ({
            id: model.id,
            label: model.name,
            manufacturer_id: model.manufacturer_id,
        }))
    }
}
