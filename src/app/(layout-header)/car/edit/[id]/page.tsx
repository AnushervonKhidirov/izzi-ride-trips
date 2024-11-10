'use client'
import type { TCar } from '@type/car'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

import Cars from '@service/car/cars'
import EditableField from '@common/editable-field/editable-field'

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

    return <Section title="Edit Car">
        <EditableField title='hello 0' value="hello value 0" editing/>
        <EditableField title='hello 1' value="hello value 1" editing/>
        <EditableField title='hello 2' value="hello value 2" editing/>
        <EditableField title='hello 3' value="hello value 3" editing/>
    </Section>
}

export default EditCarPage
