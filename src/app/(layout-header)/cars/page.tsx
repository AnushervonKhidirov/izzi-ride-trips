'use client'
import type { TCar } from '@type/car'

import { useState, useEffect } from 'react'

import Cars from '@service/car/cars'

import Section from '@common/section/section'
import CarList from '@component/car-list/car-list'

import { LinkButton } from '@common/button/button'

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
        <Section title="Your cars">
            <CarList list={carList}>
                <LinkButton title="Add New Car" href={cars.getCreateCarUrl()} />
            </CarList>
        </Section>
    )
}

export default CarsPage
