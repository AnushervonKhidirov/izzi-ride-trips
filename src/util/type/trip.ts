import type { TProperty } from './common'
import type { ErrorCustom } from './error'

// Trips
export interface ITrips {
    getCreateTripUrl: () => string
    fetchTrips: () => Promise<[TTrip[], null] | [null, ErrorCustom<Response>]>
}

// trip
export interface ITrip extends TTrip {
    getPrice: () => string
    getProperties: () => TProperty[]
    getDate: (timestamp: number) => string
    getDepartureTime: () => string
    getArrivalTime: () => string
}

export type TTrip = Readonly<{
    id: string
    from: string
    to: string
    price: number
    client_auto_id: string // NOTE: possible for getting car data
    number_of_seats: number
    departure_time: number
    arrival_time: number
    payment_method: string
}>
