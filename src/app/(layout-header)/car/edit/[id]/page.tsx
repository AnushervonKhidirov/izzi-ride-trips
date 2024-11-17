'use client'
import type { TCar } from '@type/car'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

import Cars from '@service/car/cars'
import CarEditableFields from '@component/car-editable-fields/car-editable-fields'

import Section from '@common/section/section'

const EditCarPage = () => {
    const params = useParams()

    const cars = new Cars()
    const [carData, setCarData] = useState<TCar | null>(null)

    async function getData() {
        if (typeof params.id !== 'string') return
        const [data, err] = await cars.fetchCar(params.id)
        if (err) return
        setCarData(data)
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Section title="Edit Car">{carData && <CarEditableFields carData={carData} />}</Section>
}

export default EditCarPage
