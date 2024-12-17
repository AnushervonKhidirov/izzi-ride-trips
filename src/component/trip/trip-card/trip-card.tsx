import type { FC } from 'react'
import type { TTrip } from '@type/trip'
import type { TProperty } from '@type/common'

import Image from 'next/image'
// import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
// import StraightIcon from '@mui/icons-material/Straight'
import Card from '@common/card/card'

import Trip from '@service/trip/trip'

import arrow from '@public/images/arrow.png'
import mapImage from '@public/images/trip.png'
import classes from './trip-card.module.css'

const TripCard: FC<{ tripData: TTrip }> = ({ tripData }) => {
    const trip = new Trip(tripData)

    return (
        <Card className={classes.trip_card} tag="li">
            <Image
                src={mapImage.src}
                width={mapImage.width / 3.5}
                height={mapImage.height / 3.5}
                alt="Map"
                className={classes.image}
            />

            <Direction from={trip.from} to={trip.to} />

            <About properties={trip.getProperties()} />
        </Card>
    )
}

const Direction: FC<{ from: string; to: string }> = ({ from, to }) => {
    return (
        <h4 className={classes.direction}>
            <div className={classes.from}>{from}</div>
            {/* <TrendingFlatIcon sx={{ fontSize: '1.5em' }} /> */}
            {/* <StraightIcon sx={{ fontSize: '1.5em', rotate: '180deg' }} /> */}
            <Image
                className={classes.arrow}
                src={arrow.src}
                width={arrow.width / 10}
                height={arrow.height / 10}
                alt="Arrow"
            />
            <div className={classes.to}>{to}</div>
        </h4>
    )
}

const About: FC<{ properties: TProperty[] }> = ({ properties }) => {
    return (
        <ul className={classes.about}>
            {properties.map(({ name, value }) => {
                return (
                    <li key={`${name}-${value}`}>
                        <span>{name}:</span>
                        <span>{value}</span>
                    </li>
                )
            })}
        </ul>
    )
}

export default TripCard
