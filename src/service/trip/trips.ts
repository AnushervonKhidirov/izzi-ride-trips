import type { ErrorCustom } from '@type/error'
import type { ITrips, TTrip } from '@type/trip'

import axios from 'axios'

import { Endpoint } from '@constant/request'
import { Page } from '@constant/links'

export default class Trips implements ITrips {
    async fetchTrips(): Promise<[TTrip[], null] | [null, ErrorCustom<Response>]> {
        try {
            const response = await axios.get<TTrip[]>(Endpoint.Trips)

            if (response.status !== 200) {
                throw new Error("Can't get trips, Try again later", {
                    cause: response,
                })
            }

            return [response.data, null]
        } catch (err: any) {
            return [null, err]
        }
    }

    getCreateTripUrl() {
        return Page.AddTrip
    }
}
