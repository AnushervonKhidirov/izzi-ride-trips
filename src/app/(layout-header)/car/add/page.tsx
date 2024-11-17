'use client'
import type { FormEvent } from 'react'

import { useState } from 'react'

import Section from '@common/section/section'
import { FormBtn } from '@common/button/button'
import { Input } from '@common/input/input'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { addCarInputs } from './constants'

import classes from './add-car-page.module.css'

const AddCarPage = () => {
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const body = Object.fromEntries(formData)

        setLoading(false)
        console.log('body', body)
    }

    return (
        <Section title="Add Car">
            <form onSubmit={onSubmit} className={classes.form}>
                <DatePicker />
                {addCarInputs.map(input => {
                    return (
                        <Input
                            name={input.name}
                            type={input.type}
                            label={input.label}
                            placeholder={input.placeholder}
                            required={input.required}
                            key={input.name}
                        />
                    )
                })}
                <FormBtn title="Add Car" loading={loading} />
            </form>
        </Section>
    )
}

export default AddCarPage
