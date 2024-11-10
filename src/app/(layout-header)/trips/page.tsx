'use client'
import type { TTrip } from '@type/trip'
import type { TStyles } from '@type/common'

import { useState, useEffect } from 'react'

import Section from '@common/section/section'
import TripList from '@component/trip-list/trip-list'
import Trips from '@service/trip/trips'
import { LinkButton } from '@common/button/button'

const TripsPage = () => {
    const trips = new Trips()
    const [carList, setCarList] = useState<TTrip[]>([])

    async function getData() {
        const [data, err] = await trips.fetchTrips()
        if (err) return
        setCarList(data)
    }

    const btnStyles: TStyles = {
        position: 'absolute',
        inset: 0,
        fontSize: '1.5em',
        borderRadius: 0,
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Section title="Your trips">
            <TripList list={carList}>
                <LinkButton title="Add New Trip" href={trips.getCreateTripUrl()} sx={btnStyles} />
            </TripList>
        </Section>
    )
}

export default TripsPage
