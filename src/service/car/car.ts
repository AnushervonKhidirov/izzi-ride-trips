import type { TCar, ICar, TCarType } from '@type/car'
import type { TProperty } from '@type/common'
import type { TEditableField } from '@type/form'

import { linkGenerator } from '@helper/link-generator'
import { Page } from '@constant/links'
import carImage from '@public/images/car.png'

export default class Car implements ICar {
    readonly id: string
    readonly brand: string
    readonly model: string | undefined
    readonly image: string | undefined
    readonly seats: number
    readonly type: TCarType
    readonly plate: string
    readonly year: number

    constructor(car: TCar) {
        this.id = car.id
        this.brand = car.brand
        this.model = car.model
        this.image = car.image
        this.seats = car.seats
        this.type = car.type
        this.plate = car.plate
        this.year = car.year
    }

    getAddTripUrl() {
        return linkGenerator(Page.AddTrip, { car: this.id })
    }

    getEditCarUrl() {
        return Page.EditCar.replace('[id]', this.id)
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
        return this.model ? `${this.brand} ${this.model}` : this.brand
    }

    getProperties() {
        const properties: TProperty[] = [
            {
                name: 'Type',
                value: this.type,
            },
            {
                name: 'Year',
                value: this.year,
            },
            {
                name: 'Seats',
                value: this.seats,
            },
            {
                name: 'Plate',
                value: this.plate,
            },
        ]

        return properties
    }

    getEditableFields() {
        const editableFields: TEditableField[] = [
            {
                title: 'Model',
                name: 'model',
                value: this.model ?? '',
                editable: true,
            },
            {
                title: 'Type',
                name: 'type',
                value: this.type,
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
                value: this.seats,
                editable: true,
            },
            {
                title: 'Plate',
                name: 'plate',
                value: this.plate,
                editable: true,
            },
        ]
        return editableFields
    }
}
