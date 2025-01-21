import type { ICars, TCar, TCarFormBody, TCarManufacturer, TCarModel } from '@type/car'
import type { ErrorCustom } from '@type/error'
import type { TResponse } from '@type/form'

import axios from 'axios'

import { Page } from '@constant/links'
import { Endpoint } from '@constant/request'

export default class Cars implements ICars {
    private readonly token: string

    constructor(token: string) {
        this.token = token
    }

    getCreateCarUrl() {
        return Page.AddCar
    }

    async getCar(id: string): Promise<[TCar, null] | [null, ErrorCustom<Response>]> {
        try {
            const response = await axios.get<TResponse<TCar[]>>(Endpoint.Cars, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
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

    async getCars(): Promise<[TCar[], null] | [null, ErrorCustom<Response>]> {
        try {
            const response = await axios.get<TResponse<TCar[]>>(Endpoint.Cars, {
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

    async getAllModels(): Promise<[TCarModel[], null] | [null, ErrorCustom<Response>]> {
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

    async getManufacturerModels(id: number): Promise<[TCarModel[], null] | [null, ErrorCustom<Response>]> {
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

            return [response.data.data, null]
        } catch (err: any) {
            return [null, err]
        }
    }

    async addCar(data: TCarFormBody) {
        try {
            const response = await axios.post<TResponse>(Endpoint.AddCar, data, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })

            if (response.status !== 200) {
                throw new Error(response.data.message, {
                    cause: response,
                })
            }

            return response.data
        } catch (err: any) {
            return null
        }
    }
}
