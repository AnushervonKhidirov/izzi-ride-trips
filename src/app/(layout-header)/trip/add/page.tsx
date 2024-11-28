'use client'
import type { FormEvent } from 'react'

import dynamic from 'next/dynamic'
import { useState } from 'react'

import Section from '@common/section/section'
import { FormBtn } from '@common/button/button'
import { Input } from '@common/input/input'

import { addTripInputs } from './constants'

import classes from './add-trip-page.module.css'

const LocationSearchInput = dynamic(() => import('@common/location-search-input/location-search-input'), { ssr: false })

const AddTripPage = () => {
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
                <LocationSearchInput />
        // <Section title="Add Trip">
        //     <form onSubmit={onSubmit} className={classes.form}>
        //         {addTripInputs.map(input => {
        //             return (
        //                 <Input
        //                     name={input.name}
        //                     type={input.type}
        //                     label={input.label}
        //                     placeholder={input.placeholder}
        //                     required={input.required}
        //                     key={input.name}
        //                 />
        //             )
        //         })}

        //         <FormBtn title="Add Trip" loading={loading} />
        //     </form>
        // </Section>
    )
}

export default AddTripPage
