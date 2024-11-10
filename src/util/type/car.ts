import type { StaticImageData } from 'next/image'
import type { TProperty } from './common'
import type { ErrorCustom } from './error'

// Cars
export interface ICars {
    getCreateCarUrl: () => string
    fetchCars: () => Promise<[TCar[], null] | [null, ErrorCustom<Response>]>
}

// Car
export interface ICar extends TCar {
    getAddTripUrl: () => string
    getImageData: () => StaticImageData
    getCarName: () => string
    getProperties: () => TProperty[]
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
