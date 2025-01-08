'use client'
import type { FormEvent } from 'react'
import type { TAutocompleteOption, TFormElement } from '@type/form'

import { useState, useEffect, useRef } from 'react'
import { useCookies } from 'next-client-cookies'

import Cars from '@service/car/cars'

import Section from '@common/section/section'
import { FormBtn } from '@common/button/button'
import { Input } from '@common/input/input'

import { Token } from '@constant/request'
import { Event } from '@constant/event'

import classes from './add-car-page.module.css'

const AddCarPage = () => {
    const cars = new Cars()
    const formElement = useRef<HTMLFormElement>(null)

    const cookie = useCookies()
    const token = cookie.get(Token.Access)

    const [carFormData, setCarFormData] = useState<TFormElement[]>([])
    const [carFormDataDynamic, setCarFormDataDynamic] = useState<TFormElement[]>([])

    const [loading, setLoading] = useState(false)

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const body = Object.fromEntries(formData)

        setLoading(false)
        console.log('body', body)
    }

    async function prepareForm(token: string) {
        const carFormData = await cars.addCarFormData(token)
        setCarFormData(carFormData)

        setCarFormDataDynamic(() => {
            return carFormData.map(formElement => {
                if (formElement.name === 'model') {
                    return {
                        ...formElement,
                        options: [],
                    }
                }

                return formElement
            })
        })
    }

    async function autocompleteEventHandler(e: CustomEventInit<TAutocompleteOption>) {
        if (!token || !e.detail) return

        // const availableModels = await cars.getModelsByManufacturerId(e.detail.id, token)
        const allModels = carFormData.find(data => data.name === 'model')
        const manufacturerId = e.detail.id

        if (allModels && allModels.options) {
            const options = allModels.options as (TAutocompleteOption & { manufacturer_id: number })[]
            const availableModels = options.filter(model => model.manufacturer_id === manufacturerId)

            setCarFormDataDynamic(formElements => {
                return formElements.map(formElement => {
                    if (formElement.name === 'model') {
                        return {
                            ...formElement,
                            options: availableModels,
                        }
                    }

                    return formElement
                })
            })
        }
    }

    useEffect(() => {
        if (token) prepareForm(token)
    }, [token])

    useEffect(() => {
        formElement.current?.addEventListener(Event.Autocomplete, autocompleteEventHandler)

        return () => {
            formElement.current?.removeEventListener(Event.Autocomplete, autocompleteEventHandler)
        }
    })

    return (
        carFormDataDynamic.length > 0 && (
            <Section title="Add Car">
                <form onSubmit={onSubmit} ref={formElement} className={classes.form}>
                    {carFormDataDynamic.map(input => {
                        return (
                            <Input
                                name={input.name}
                                type={input.type}
                                label={input.label}
                                placeholder={input.placeholder}
                                required={input.required}
                                options={input.options}
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
