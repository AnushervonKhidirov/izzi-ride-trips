import type { StaticImageData } from 'next/image'
import type { TProperty } from './common'
import type { ErrorCustom } from './error'
import type { TNavigationData } from './navigation'
import type { TAutocompleteOption, TEditableField, TFormElement, TResponse } from './form'

// Cars
export interface ICars {
    getCreateCarUrl: () => string
    getCars: () => Promise<[TCar[], null] | [null, ErrorCustom<Response>]>
    getCar: (id: string) => Promise<[TCar, null] | [null, ErrorCustom<Response>]>
    getManufacturers: () => Promise<[TCarManufacturer[], null] | [null, ErrorCustom<Response>]>
    getAllModels: () => Promise<[TCarModel[], null] | [null, ErrorCustom<Response>]>
    getManufacturerModels: (id: number) => Promise<[TCarModel[], null] | [null, ErrorCustom<Response>]>
    addCar: (data: TCarFormBody) => Promise<TResponse | null>
}

export interface ICarsForm {
    updateFormList: (list: TFormElement[], data: { name: string; value: TAutocompleteOption[] }) => TFormElement[]
    getManufacturersOptions: (list: TCarManufacturer[]) => void
    getModelOptions: (list: TCarModel[]) => void
    getPreferencesFields: () => string[]
    getAddCarBody: (form: HTMLFormElement, models: TCarModel[], roleId: number) => TCarFormBody | null
    getEditCarBody: (form: HTMLFormElement, models: TCarModel, roleId: number) => TCarFormBody | null
    getEditableFormList: (car: TCar, data: { manufacturer: TCarManufacturer; model: TCarModel }) => TFormElement[]
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

export type TCar = {
    car_id: number
    number_of_seats: number
    model: string
    manufacturer: string
    auto_number: string
    color?: string
    year: string | number
    preferences: TCarPreferences
    image?: string
}

export type TCarFormBody = Omit<TCar, 'car_id' | 'model' | 'manufacturer'> & {
    role_id: number
    manufacturer_id: number
    model_id: number
}

export type TCarFormEntries = {
    image?: string
    manufacturer: string
    model: string
    number_of_seats: number
    year: string | number
    auto_number: string
    color: string
    animals?: string
    child_car_seat?: string
    luggage?: string
    smoking?: string
}

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

export type TCarModelOption = TAutocompleteOption & {
    manufacturer_id: number
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
