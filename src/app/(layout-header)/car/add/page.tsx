'use client'
import { FormEvent } from 'react'

import Section from '@common/section/section'
import Form from '@common/form/form'

import { createCarInputs } from '@constant/form'

import classes from './add-car-page.module.css'

const AddCarPage = () => {
    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const body = Object.fromEntries(formData)

        console.log('body', body)
    }

    return (
        <Section title="Add Car">
            <Form inputs={createCarInputs} submitFunc={onSubmit} buttonText="Create car" className={classes.form} />
        </Section>
    )
}

export default AddCarPage
