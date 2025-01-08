import type { ICars, TCar, TCarManufacturer, TCarModel } from '@type/car'
import type { ErrorCustom } from '@type/error'
import type { TResponse } from '@type/auth'
import type { TFormElement, TAutocompleteOption } from '@type/form'

import axios from 'axios'

import { Page } from '@constant/links'
import { Endpoint } from '@constant/request'

import carImage from '@public/images/car.png'

// TODO: move forms methods to individual service !!!
export default class Cars implements ICars {
    getCreateCarUrl() {
        return Page.AddCar
    }

    async addCarFormData(token: string): Promise<TFormElement[]> {
        const [manufacturerList] = await this.getManufacturers(token)
        const [modelList] = await this.getModels(token)

        const manufacturerOptions = manufacturerList
            ? manufacturerList.map<TAutocompleteOption>(manufacturer => ({
                  id: manufacturer.id,
                  label: manufacturer.name,
              }))
            : []

        const modelOptions = modelList
            ? modelList.map<TAutocompleteOption & { manufacturer_id: number }>(model => ({
                  id: model.id,
                  label: model.name,
                  manufacturer_id: model.manufacturer_id,
              }))
            : []

        const result: TFormElement[] = [
            {
                name: 'image',
                type: 'image',
                placeholder: carImage.src,
            },
            {
                name: 'manufacturer',
                type: 'text',
                label: 'Manufacturer',
                options: manufacturerOptions,
                required: true,
            },
            {
                name: 'model',
                type: 'text',
                label: 'Model',
                options: modelOptions,
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

        return result
    }

    async getManufacturers(token: string): Promise<[TCarManufacturer[], null] | [null, ErrorCustom<Response>]> {
        try {
            const response = await axios.get<TResponse<TCarManufacturer[]>>(Endpoint.CarManufacturers, {
                headers: {
                    Authorization: `Bearer ${token}`,
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

    async getModels(token: string): Promise<[TCarModel[], null] | [null, ErrorCustom<Response>]> {
        try {
            const response = await axios.get<TResponse<TCarModel[]>>(Endpoint.CarModels, {
                headers: {
                    Authorization: `Bearer ${token}`,
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

    async fetchCar(id: string, token: string): Promise<[TCar, null] | [null, ErrorCustom<Response>]> {
        try {
            const response = await axios.get<TResponse<TCar[]>>(Endpoint.Cars, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.status !== 200 || !response.data.data) {
                throw new Error(response.data.message, {
                    cause: response,
                })
            }

            const car = response.data.data.find(car => car.car_id === parseInt(id))

            if (!car) throw new Error('There is no such car')

            return [car, null]
        } catch (err: any) {
            return [null, err]
        }
    }

    async fetchCars(token: string): Promise<[TCar[], null] | [null, ErrorCustom<Response>]> {
        try {
            const response = await axios.get<TResponse<TCar[]>>(Endpoint.Cars, {
                headers: {
                    Authorization: `Bearer ${token}`,
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
}
