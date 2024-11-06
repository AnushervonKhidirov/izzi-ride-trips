import type { TCar } from '@type/car'

import CarCard from '@component/car-card/car-card'

const CarsPage = () => {
    const carData: TCar = {
        id: 'fadasr-fasdfasdf-adfasdf-asdf',
        brand: 'Lexus',
        model: 'RX 350',
        type: 'Crossover',
        seats: 5,
        plate: '3023 AR 01',
        year: 2021,
    }

    return (
        <div>
            <CarCard car={carData} />
        </div>
    )
}

export default CarsPage
