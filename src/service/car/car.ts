import type { TCar, ICar, TCarPreferences } from '@type/car'
import type { TChip, TProperty } from '@type/common'
import type { TEditableField } from '@type/form'

import { linkGenerator } from '@helper/link-generator'
import { Page } from '@constant/links'
import carImage from '@public/images/car.png'

export default class Car implements ICar {
    readonly car_id: number
    readonly manufacturer: string
    readonly model: string
    readonly image: string | undefined
    readonly number_of_seats: number
    readonly auto_number: string
    readonly year: string | number
    readonly color: string
    readonly preferences: TCarPreferences

    constructor(car: TCar) {
        this.car_id = car.car_id
        this.manufacturer = car.manufacturer
        this.model = car.model
        this.image = car.image
        this.number_of_seats = car.number_of_seats
        this.color = car.color
        this.auto_number = car.auto_number
        this.year = car.year
        this.preferences = car.preferences
    }

    getAddTripUrl() {
        return linkGenerator(Page.AddTrip, { car: this.car_id })
    }

    getEditCarUrl() {
        return Page.EditCar.replace('[id]', this.car_id.toString())
    }

    getActionButtons() {
        const actionButtons = [
            {
                title: 'Add Trip',
                href: this.getAddTripUrl(),
            },
            {
                title: 'Edit Car',
                href: this.getEditCarUrl(),
            },
        ]
        return actionButtons
    }

    getImageData() {
        return this.image ? { src: this.image, width: 300, height: 300 } : { ...carImage }
    }

    getCarName() {
        return `${this.manufacturer} ${this.model}`
    }

    getPreferences() {
        const preferences: TChip[] = [
            {
                name: 'Smoking',
                value: this.preferences.smoking,
            },
            {
                name: 'Animals',
                value: this.preferences.animals,
            },
            {
                name: 'Luggage',
                value: this.preferences.luggage,
            },
            {
                name: 'Child car seat',
                value: this.preferences.child_car_seat,
            },
        ]

        return preferences
    }

    getProperties() {
        const properties: TProperty[] = [
            {
                name: 'Year',
                value: this.year,
            },
            {
                name: 'Seats',
                value: this.number_of_seats,
            },
            {
                name: 'Plate',
                value: this.auto_number,
            },
            {
                name: 'Color',
                value: this.color,
            },
        ]

        return properties
    }

    getEditableFields() {
        const editableFields: TEditableField[] = [
            {
                title: 'Model',
                name: 'model',
                value: this.model,
                editable: true,
            },
            {
                title: 'Year',
                name: 'year',
                value: this.year,
                editable: true,
            },
            {
                title: 'Seats',
                name: 'seats',
                value: this.number_of_seats,
                editable: true,
            },
            {
                title: 'Color',
                name: 'color',
                value: this.color,
                editable: true,
            },
            {
                title: 'Plate',
                name: 'plate',
                value: this.auto_number,
                editable: true,
            },
        ]
        return editableFields
    }
}
