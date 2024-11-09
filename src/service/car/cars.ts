import type { ICars, TCar } from '@type/car'

import axios from 'axios'

import { Endpoint } from '@constant/request'
import { ErrorCustom } from '@type/error'

export default class Cars implements ICars {
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
