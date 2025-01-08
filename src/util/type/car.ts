import type { StaticImageData } from 'next/image'
import type { TProperty } from './common'
import type { ErrorCustom } from './error'
import type { TNavigationData } from './navigation'
import type { TEditableField, TFormElement } from './form'

// Cars
export interface ICars {
    getCreateCarUrl: () => string
    fetchCars: (token: string) => Promise<[TCar[], null] | [null, ErrorCustom<Response>]>
    fetchCar: (id: string, token: string) => Promise<[TCar, null] | [null, ErrorCustom<Response>]>
    getManufacturers: (token: string) => Promise<[TCarManufacturer[], null] | [null, ErrorCustom<Response>]>
    getModels: (token: string) => Promise<[TCarModel[], null] | [null, ErrorCustom<Response>]>
    addCarFormData: (token: string) => Promise<TFormElement[]>
}

// Car
export interface ICar extends TCar {
    getAddTripUrl: () => string
    getEditCarUrl: () => string
    getActionButtons: () => TNavigationData[]
    getImageData: () => StaticImageData
    getCarName: () => string
    getProperties: () => TProperty[]
    getEditableFields: () => TEditableField[]
}

export type TCar = Readonly<{
    car_id: number
    number_of_seats: number
    model: string
    manufacturer: string
    auto_number: string
    color: string
    year: string | number
    preferences: TCarPreferences
    image?: string
}>

export type TCarPreferences = {
    smoking: boolean
    child_car_seat: boolean
    animals: boolean
    luggage: boolean
}

export type TCarManufacturer = {
    id: number
    country: string
    name: string
}

export type TCarModel = {
    id: number
    manufacturer_id: number
    name: string
}

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
