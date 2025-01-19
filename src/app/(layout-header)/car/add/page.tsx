'use client'
import type { FormEvent } from 'react'
import type { TAutocompleteOption, TFormElement } from '@type/form'
import type { TCarModel } from '@type/car'

import { useState, useEffect, useRef } from 'react'
import { useCookies } from 'next-client-cookies'

import { CarForm } from '@service/car/carForm'
import Cars from '@service/car/cars'

import Section from '@common/section/section'
import { FormBtn } from '@common/button/button'
import { Input } from '@common/input/input'

import { Token } from '@constant/request'
import { Event } from '@constant/event'

import classes from './add-car-page.module.css'

const AddCarPage = () => {
    const cookie = useCookies()
    const token = cookie.get(Token.Access) ?? ''

    const carForm = new CarForm()
    const cars = new Cars(token)

    const formElement = useRef<HTMLFormElement>(null)

    const [carFormData, setCarFormData] = useState<TFormElement[]>(carForm.defaultFormList)
    const [carModels, setCarModels] = useState<TCarModel[]>([])

    const [loading, setLoading] = useState(false)

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setLoading(true)

        const body = carForm.getAddCarBody(e.currentTarget, carModels, 3)
        if (body) await cars.addCar(body)

        setLoading(false)
    }

    async function prepareForm() {
        const [manufacturers, err] = await cars.getManufacturers()

        if (err) return

        setCarFormData(
            carForm.updateFormList(carFormData, {
                name: 'manufacturer',
                value: carForm.getManufacturersOptions(manufacturers),
            }),
        )
    }

    async function autocompleteEventHandler(e: CustomEventInit<TAutocompleteOption>) {
        if (!e.detail || e.detail.manufacturer_id) return

        const [models, err] = await cars.getManufacturerModels(e.detail.id)

        if (err) return

        setCarModels(models)

        setCarFormData(
            carForm.updateFormList(carFormData, {
                name: 'model',
                value: carForm.getModelOptions(models),
            }),
        )
    }

    useEffect(() => {
        prepareForm()
    }, [])

    useEffect(() => {
        formElement.current?.addEventListener(Event.Autocomplete, autocompleteEventHandler)

        return () => {
            formElement.current?.removeEventListener(Event.Autocomplete, autocompleteEventHandler)
        }
    })

    return (
        carFormData.length > 0 && (
            <Section title="Add Car">
                <form onSubmit={onSubmit} ref={formElement} className={classes.form}>
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

export default AddCarPage
