'use client'
import type { FormEvent } from 'react'
import type { TFormElement } from '@type/form'
import type { TCarModel } from '@type/car'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useCookies } from 'next-client-cookies'

import Cars from '@service/car/cars'
import { CarForm } from '@service/car/carForm'

import Section from '@common/section/section'
import { Token } from '@constant/request'
import { Input } from '@common/input/input'
import { FormBtn } from '@common/button/button'

import classes from './edit-car-page.module.css'

const EditCarPage = () => {
    const params = useParams()
    const cookie = useCookies()
    const token = cookie.get(Token.Access) ?? ''

    const carForm = new CarForm()
    const cars = new Cars(token)

    const [carFormData, setCarFormData] = useState<TFormElement[]>([])
    const [model, setModel] = useState<TCarModel>()
    const [loading, setLoading] = useState(false)

    async function getData() {
        if (typeof params.id !== 'string') return

        const [car, err] = await cars.getCar(params.id)
        if (err) return

        const [manufacturer, manufacturerErr] = await cars.getManufacturers()
        if (manufacturerErr) return

        const currentManufacturer = manufacturer.find(manufacturerItem => {
            return manufacturerItem.name === car.manufacturer
        })

        if (!currentManufacturer) return

        const [model, modelErr] = await cars.getManufacturerModels(currentManufacturer.id)
        if (modelErr) return

        const currentModel = model.find(modelItem => {
            return modelItem.name === car.model
        })

        if (!currentModel) return
        setModel(currentModel)

        const formData = carForm.getEditableFormList(car, { manufacturer: currentManufacturer, model: currentModel })

        setCarFormData(formData)
    }

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!model) return

        setLoading(true)

        const body = carForm.getEditCarBody(e.currentTarget, model, 3)

        console.log('body', body)

        // if (body) await cars.addCar(body)

        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [token])

    return (
        carFormData.length > 0 && (
            <Section title="Edit Car">
                <form onSubmit={onSubmit} className={classes.form}>
                    {carFormData.map(input => {
                        return (
                            <Input
                                name={input.name}
                                type={input.type}
                                label={input.label}
                                placeholder={input.placeholder}
                                required={input.required}
                                options={input.options}
                                defaultValue={input.defaultValue}
                                defaultChecked={input.defaultChecked}
                                disabled={input.disabled}
                                key={input.name}
                            />
                        )
                    })}

                    <FormBtn title="Add Car" loading={loading} />
                </form>
            </Section>
        )
    )
}

export default EditCarPage
