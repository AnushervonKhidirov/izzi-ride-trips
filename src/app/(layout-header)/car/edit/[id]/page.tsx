'use client'
import type { TCar } from '@type/car'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useCookies } from 'next-client-cookies'

import Cars from '@service/car/cars'
import CarEditableFields from '@component/car/car-editable-fields/car-editable-fields'

import Section from '@common/section/section'
import { Token } from '@constant/request'

const EditCarPage = () => {
    const params = useParams()

    const cookie = useCookies()
    const token = cookie.get(Token.Access)

    const cars = new Cars()
    const [carData, setCarData] = useState<TCar | null>(null)

    async function getData(token: string) {
        if (typeof params.id !== 'string') return
        const [data, err] = await cars.fetchCar(params.id, token)
        if (err) return
        setCarData(data)
    }

    useEffect(() => {
        if (token) getData(token)
    }, [token])

    return <Section title="Edit Car">{carData && <CarEditableFields carData={carData} />}</Section>
}

export default EditCarPage
