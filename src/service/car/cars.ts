import type { ICars, TCar } from '@type/car'
import type { ErrorCustom } from '@type/error'

import axios from 'axios'

import { Page } from '@constant/links'
import { Endpoint } from '@constant/request'

export default class Cars implements ICars {
    getCreateCarUrl() {
        return `${Page.CreateCar}`
    }

    async fetchCars(): Promise<[TCar[], null] | [null, ErrorCustom<Response>]> {
        try {
            const response = await axios.get<TCar[]>(Endpoint.Cars)

            if (response.status !== 200) {
                throw new Error("Can't get cars, Try again later", {
                    cause: response,
                })
            }

            return [response.data, null]
        } catch (err: any) {
            return [null, err]
        }
    }
}
