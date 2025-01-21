import type { TAutocompleteOption, TDefaultFormElementData, TFormElement } from '@type/form'
import type {
    ICarsForm,
    TCar,
    TCarFormBody,
    TCarFormEntries,
    TCarManufacturer,
    TCarModel,
    TCarModelOption,
    TCarPreferences,
} from '@type/car'

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
                name: 'color',
                type: 'color',
                label: 'Color',
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

    getAddCarBody(form: HTMLFormElement, models: TCarModel[], roleId: number) {
        const formData = new FormData(form)
        const formEntries = Object.fromEntries<unknown>(formData) as TCarFormEntries
        const model = models.find(model => model.name === formEntries.model)
        const nullColorValue = '#00000000'

        if (!model) return null

        const preferences: TCarPreferences = {
            animals: formEntries.animals === 'on',
            child_car_seat: formEntries.child_car_seat === 'on',
            luggage: formEntries.luggage === 'on',
            smoking: formEntries.smoking === 'on',
        }

        const result: TCarFormBody = {
            role_id: roleId,
            auto_number: formEntries.auto_number,
            manufacturer_id: model.manufacturer_id,
            model_id: model.id,
            number_of_seats: Number(formEntries.number_of_seats),
            year: formEntries.year.toString(),
            image: formEntries.image,
            preferences,
        }

        if (formEntries.color !== nullColorValue) {
            result.color = formEntries.color
        }

        return result
    }

    getEditCarBody(form: HTMLFormElement, model: TCarModel, roleId: number) {
        const formData = new FormData(form)
        const formEntries = Object.fromEntries<unknown>(formData) as TCarFormEntries
        const nullColorValue = '#00000000'

        const preferences: TCarPreferences = {
            animals: formEntries.animals === 'on',
            child_car_seat: formEntries.child_car_seat === 'on',
            luggage: formEntries.luggage === 'on',
            smoking: formEntries.smoking === 'on',
        }

        const result: TCarFormBody = {
            role_id: roleId,
            auto_number: formEntries.auto_number,
            manufacturer_id: model.manufacturer_id,
            model_id: model.id,
            number_of_seats: Number(formEntries.number_of_seats),
            year: formEntries.year.toString(),
            image: formEntries.image,
            preferences,
        }

        if (formEntries.color !== nullColorValue) {
            result.color = formEntries.color
        }

        return result
    }

    getEditableFormList(car: TCar, data: { manufacturer: TCarManufacturer; model: TCarModel }) {
        const preferences = car.preferences
        const convertedData: { [key: string]: any } = { ...car, ...preferences }

        delete convertedData.preferences
        delete convertedData.car_id

        const disabledFields = ['manufacturer', 'model']
        const optionsFields: (keyof typeof data)[] = ['manufacturer', 'model']

        const formList: TFormElement[] = this.defaultFormList.map(field => {
            if (!field.name) return field

            if (disabledFields.includes(field.name)) {
                field.disabled = true
            }

            if (field.name in convertedData) {
                if (field.type === 'checkbox') field.defaultChecked = convertedData[field.name]
                
                if (optionsFields.includes(field.name as keyof typeof data)) {
                    const fieldName = field.name as keyof typeof data
                    field.defaultValue = { id: data[fieldName].id, label: data[fieldName].name }
                } else {
                    field.defaultValue = convertedData[field.name]
                }
            }

            return field
        })

        return formList
    }
}
