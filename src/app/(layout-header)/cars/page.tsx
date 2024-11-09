'use client'
import type { TCar } from '@type/car'

import { useState, useEffect } from 'react'

import Cars from '@service/car/cars'
import CarList from '@component/car-list/car-list'

const CarsPage = () => {
    const cars = new Cars()
    const [carList, setCarList] = useState<TCar[]>([])

    async function getData() {
        const [data, err] = await cars.fetchCars()
        if (err) return
        setCarList(data)
    }

    useEffect(() => {
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <CarList title="Your cars" list={carList} />
        </div>
    )
}

export default CarsPage
