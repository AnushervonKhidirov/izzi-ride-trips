import type { StaticImageData } from 'next/image'
import type { TProperty } from './common'
import type { ErrorCustom } from './error'
import { TNavigationData } from './navigation'

// Cars
export interface ICars {
    getCreateCarUrl: () => string
    fetchCars: () => Promise<[TCar[], null] | [null, ErrorCustom<Response>]>
    fetchCar: (id: string) => Promise<[TCar, null] | [null, ErrorCustom<Response>]>
}

// Car
export interface ICar extends TCar {
    getAddTripUrl: () => string
    getEditCarUrl: () => string
    getActionButtons: () => TNavigationData[]
    getImageData: () => StaticImageData
    getCarName: () => string
    getProperties: () => TProperty[]
}

export type TCar = Readonly<{
    id: string
    brand: string
    model: string | undefined
    type: TCarType
    seats: number
    plate: string
    year: number
    image: string | undefined
}>

export type TCarType =
    | 'Off-road vehicles'
    | 'Minivans'
    | 'Luxury saloon / Full-size luxury'
    | 'City car / Minicompact'
    | 'Supermini / Subcompact'
    | 'Executive / Full-size'
    | 'Small family / Compac'
    | 'Large family / Mid-size'
    | 'Sports'
