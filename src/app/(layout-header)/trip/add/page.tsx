'use client'
import { FormEvent } from 'react'

import Section from '@common/section/section'
import Form from '@common/form/form'

import { createCarInputs } from '@constant/form'

import classes from './create-car.module.css'

const AddTripPage = () => {
    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const body = Object.fromEntries(formData)

        console.log('body', body);
        
    }

    return (
        <Section title="Add Trip">
            <Form inputs={createCarInputs} submitFunc={onSubmit} buttonText="Create trip" className={classes.form} />
        </Section>
    )
}

export default AddTripPage
