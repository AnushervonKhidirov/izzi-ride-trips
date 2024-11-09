import type { StaticImageData } from 'next/image'
import type { TCar } from '@type/car'

import { linkGenerator } from '@helper/link-generator'
import { Page } from '@constant/links'
import carImage from '@public/images/car.png'

interface ICar extends TCar {
    getAddTripUrl: () => string
    getImageData: () => StaticImageData
    getCarName: () => string
    getProperties: () => TProperty[]
}

export type TProperty = {
    key: string
    name: string
    value: string | number
}

export default class Car implements ICar {
    readonly id: string
    readonly brand: string
    readonly model: string | undefined
    readonly image: string | undefined
    readonly properties: { [key: string]: string | number }

    constructor(car: TCar) {
        this.id = car.id
        this.brand = car.brand
        this.model = car.model
        this.image = car.image
        this.properties = car.properties
    }

    getAddTripUrl() {
        return linkGenerator(Page.CreateTrip, { car: this.id })
    }

    getImageData() {
        return this.image ? { src: this.image, width: 300, height: 300 } : { ...carImage }
    }

    getCarName() {
        return this.model ? `${this.brand} ${this.model}` : this.brand
    }

    getProperties() {
        const properties = []

        for (const property in this.properties) {
            const name = (property.charAt(0).toUpperCase() + property.slice(1)).replaceAll('_', ' ')

            properties.push({
                key: property,
                name: name,
                value: this.properties[property],
            })
        }

        return properties
    }
}
