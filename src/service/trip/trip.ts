import type { TProperty } from '@type/common'
import type { ITrip, TTrip } from '@type/trip'

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
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }

    getProperties() {
        const propertyList: TProperty[] = [
            {
                key: 'departure_time',
                name: 'Departure Time',
                value: this.getDepartureTime(),
            },
            {
                key: 'arrival_time',
                name: 'Arrival Time',
                value: this.getArrivalTime(),
            },
            {
                key: 'number_of_seats',
                name: 'Number of Seats',
                value: this.number_of_seats,
            },
            {
                key: 'price',
                name: 'Price',
                value: this.getPrice(),
            },
            {
                key: 'payment_method',
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
