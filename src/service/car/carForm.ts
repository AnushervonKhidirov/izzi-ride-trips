import type { TAutocompleteOption, TDefaultFormElementData, TFormElement } from '@type/form'
import type { TCarManufacturer, TCarModel, TCarModelOption } from '@type/car'
import type { TResponse } from '@type/auth'
import type { ErrorCustom } from '@type/error'

import { Endpoint } from '@constant/request'

import axios from 'axios'

import carImage from '@public/images/car.png'

export class CarForm {
    token: string
    defaultValues: TDefaultFormElementData[] | undefined
    formData: TFormElement[]
    manufacturerList: TCarManufacturer[]
    modelList: TCarModel[]
    manufacturerOptions: TAutocompleteOption[]
    modelOptions: TCarModelOption[]

    constructor(token: string, defaultValues?: TDefaultFormElementData[]) {
        this.token = token
        this.defaultValues = defaultValues

        this.manufacturerList = []
        this.modelList = []

        this.manufacturerOptions = []
        this.modelOptions = []

        this.formData = [
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
        ]
    }

    getFormData() {
        return this.formData
    }

    updateFormData() {}

    async getManufacturers(): Promise<[TCarManufacturer[], null] | [null, ErrorCustom<Response>]> {
        try {
            const response = await axios.get<TResponse<TCarManufacturer[]>>(Endpoint.CarManufacturers, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })

            if (response.status !== 200 || !response.data.data) {
                throw new Error(response.data.message, {
                    cause: response,
                })
            }

            return [response.data.data, null]
        } catch (err: any) {
            return [null, err]
        }
    }

    async getModels(): Promise<[TCarModel[], null] | [null, ErrorCustom<Response>]> {
        try {
            const response = await axios.get<TResponse<TCarModel[]>>(Endpoint.CarModels, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })

            if (response.status !== 200 || !response.data.data) {
                throw new Error(response.data.message, {
                    cause: response,
                })
            }

            return [response.data.data, null]
        } catch (err: any) {
            return [null, err]
        }
    }

    convertManufacturersToOptions() {
        this.manufacturerOptions = this.manufacturerList.map<TAutocompleteOption>(manufacturer => ({
            id: manufacturer.id,
            label: manufacturer.name,
        }))
    }

    convertModuleToOptions() {
        this.modelOptions = this.modelList.map<TCarModelOption>(model => ({
            id: model.id,
            label: model.name,
            manufacturer_id: model.manufacturer_id,
        }))
    }
}
