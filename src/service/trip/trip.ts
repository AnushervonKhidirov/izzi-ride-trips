import type { TProperty } from '@type/common'
import type { ITrip, TTrip } from '@type/trip'

import { getDay, getTime } from '@helper/date'

export default class Trip implements ITrip {
    readonly id: string
    readonly from: string
    readonly to: string
    readonly departure_time: number
    readonly arrival_time: number
    readonly number_of_seats: number
    readonly payment_method: string
    readonly price: number
    readonly client_auto_id: string

    constructor(trip: TTrip) {
        this.id = trip.id
        this.from = trip.from
        this.to = trip.to
        this.client_auto_id = trip.client_auto_id
        this.departure_time = trip.departure_time
        this.arrival_time = trip.arrival_time
        this.number_of_seats = trip.number_of_seats
        this.payment_method = trip.payment_method
        this.price = trip.price
    }

    getPrice() {
        return `${this.price}$`
    }

    getDate(timestamp: number) {
        const date = new Date(timestamp)

        const day = getDay(date)
        const time = getTime(date)

        return `${day} at ${time}`
    }

    getProperties() {
        const propertyList: TProperty[] = [
            {
                name: 'Departure Time',
                value: this.getDepartureTime(),
            },
            {
                name: 'Arrival Time',
                value: this.getArrivalTime(),
            },
            {
                name: 'Number of Seats',
                value: this.number_of_seats,
            },
            {
                name: 'Price',
                value: this.getPrice(),
            },
            {
                name: 'Payment Method',
                value: this.payment_method,
            },
        ]

        return propertyList
    }

    getDepartureTime() {
        return this.getDate(this.departure_time)
    }

    getArrivalTime() {
        return this.getDate(this.arrival_time)
    }
}
