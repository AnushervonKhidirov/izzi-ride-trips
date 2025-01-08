import type { ICars, TCar } from '@type/car'
import type { ErrorCustom } from '@type/error'
import type { TResponse } from '@type/auth'

import axios from 'axios'

import { Page } from '@constant/links'
import { Endpoint } from '@constant/request'

export default class Cars implements ICars {
    getCreateCarUrl() {
        return Page.AddCar
    }

    async fetchCar(id: string, token: string): Promise<[TCar, null] | [null, ErrorCustom<Response>]> {
        try {
            const response = await axios.get<TResponse<TCar[]>>(Endpoint.Cars, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            console.log('response', response.data)
            

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
