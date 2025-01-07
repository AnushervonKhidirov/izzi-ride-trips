'use client'
import type { TCar } from '@type/car'
import type { TStyles } from '@type/common'

import { useState, useEffect } from 'react'
import { useCookies } from 'next-client-cookies'

import Cars from '@service/car/cars'

import Section from '@common/section/section'
import CarList from '@component//car/car-list/car-list'

import { Button } from '@common/button/button'
import { Token } from '@constant/request'

const CarsPage = () => {
    const cars = new Cars()
    const cookie = useCookies()
    const token = cookie.get(Token.Access)

    const [carList, setCarList] = useState<TCar[]>([])

    async function getData(token: string) {
        const [data, err] = await cars.fetchCars(token)
        if (err) return
        setCarList(data)
    }

    const btnStyles: TStyles = {
        position: 'absolute',
        inset: 0,
        fontSize: '1.5em',
        borderRadius: 0,
    }

    useEffect(() => {
        if (token) getData(token)
    }, [token])

    return (
        <Section title="Your cars">
            <CarList list={carList}>
                <Button title="Add New Car" href={cars.getCreateCarUrl()} sx={btnStyles} />
            </CarList>
        </Section>
    )
}

export default CarsPage
