import type { TCar } from '@type/car'

import CarList from '@component/car-list/car-list'

const CarsPage = () => {
    const cars: TCar[] = [
        {
            id: 'fadasr-fasdfasdf-adfasdf-asdf',
            brand: 'Lexus',
            model: 'RX 350',
            image: undefined,
            properties: {
                type: 'Crossover',
                seats: 5,
                plate: '3023 AR 01',
                year: 2021,
            },
        },
        {
            id: 'fadasr-fasdfsdf-adfasdf-asdf',
            brand: 'Lexus',
            model: 'RX 250',
            image: undefined,
            properties: {
                type: 'Crossover',
                seats: 4,
                plate: '3013 AR 01',
                year: 2021,
            },
        },
        {
            id: 'fadasr-fasdfsdf-adfasdf-asdfd',
            brand: 'Lexus',
            model: 'RX 250',
            image: undefined,
            properties: {
                type: 'Crossover',
                seats: 4,
                plate: '3013 AR 01',
                year: 2021,
            },
        },
        {
            id: 'fadasr-fasdfdf-adfasdf-asdf',
            brand: 'Lexus',
            model: 'RX 250',
            image: undefined,
            properties: {
                type: 'Crossover',
                seats: 4,
                plate: '3013 AR 01',
                year: 2021,
            },
        },
        {
            id: 'fadasr-fasdfsdf-adfasf-asdf',
            brand: 'Lexus',
            model: 'RX 250',
            image: undefined,
            properties: {
                type: 'Crossover',
                seats: 4,
                plate: '3013 AR 01',
                year: 2021,
            },
        },
    ]

    return (
        <div>
            <CarList title="Your cars" list={cars} />
        </div>
    )
}

export default CarsPage
