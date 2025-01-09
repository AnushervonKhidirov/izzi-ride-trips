import type { TAutocompleteOption, TDefaultFormElementData, TFormElement } from '@type/form'
import type { TCarManufacturer, TCarModel, TCarModelOption } from '@type/car'
import type { TResponse } from '@type/auth'
import type { ErrorCustom } from '@type/error'

import { Endpoint } from '@constant/request'

import axios from 'axios'

import carImage from '@public/images/car.png'

export class CarForm {
    private readonly token: string
    readonly defaultValues: TDefaultFormElementData[] | undefined
    formList: TFormElement[]
    manufacturerList: TCarManufacturer[]
    modelList: TCarModel[]

    constructor(token: string, defaultValues?: TDefaultFormElementData[]) {
        this.token = token
        this.defaultValues = defaultValues

        this.manufacturerList = []
        this.modelList = []

        this.formList = [
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

    getFormList() {
        return this.formList
    }

    updateFormList(name: string, value: TAutocompleteOption[]) {
        this.formList = this.formList.map(formListItem => {
            if (formListItem.name === name) {
                return {
                    ...formListItem,
                    options: value,
                }
            }

            return formListItem
        })
    }

    async getManufacturers(
        shouldUpdateFormList?: boolean,
    ): Promise<[TCarManufacturer[], null] | [null, ErrorCustom<Response>]> {
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

            this.manufacturerList = response.data.data

            if (shouldUpdateFormList) this.updateFormList('manufacturer', this.getManufacturersOptions())

            return [this.manufacturerList, null]
        } catch (err: any) {
            return [null, err]
        }
    }

    async getAllModels(shouldUpdateFormList?: boolean): Promise<[TCarModel[], null] | [null, ErrorCustom<Response>]> {
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

            this.modelList = response.data.data

            if (shouldUpdateFormList) this.updateFormList('model', this.getModelOptions())

            return [this.modelList, null]
        } catch (err: any) {
            return [null, err]
        }
    }

    async getManufacturerModels(
        id: number,
        shouldUpdateFormList?: boolean,
    ): Promise<[TCarModel[], null] | [null, ErrorCustom<Response>]> {
        const endpoint = Endpoint.CarManufacturerModels.replace('[id]', id.toString())

        try {
            const response = await axios.get<TResponse<TCarModel[]>>(endpoint, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })

            if (response.status !== 200 || !response.data.data) {
                throw new Error(response.data.message, {
                    cause: response,
                })
            }

            this.modelList = response.data.data

            if (shouldUpdateFormList) this.updateFormList('model', this.getModelOptions())

            return [this.modelList, null]
        } catch (err: any) {
            return [null, err]
        }
    }

    getManufacturersOptions() {
        return this.manufacturerList.map<TAutocompleteOption>(manufacturer => ({
            id: manufacturer.id,
            label: manufacturer.name,
        }))
    }

    getModelOptions() {
        return this.modelList.map<TCarModelOption>(model => ({
            id: model.id,
            label: model.name,
            manufacturer_id: model.manufacturer_id,
        }))
    }
}
