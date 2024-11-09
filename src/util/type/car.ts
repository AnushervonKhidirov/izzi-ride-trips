import type { StaticImageData } from 'next/image'

// Cars
export interface ICars {
    fetchCars: () => Promise<[TCar[], null] | [null, any]>
}

// Car
export interface ICar extends TCar {
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

export type TCar = Readonly<{
    id: string
    brand: string
    model: string | undefined
    image: string | undefined
    properties: {
        [key: string]: string | number
    }
}>
