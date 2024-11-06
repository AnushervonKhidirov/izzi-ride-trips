import type { FC } from 'react'
import type { AdditionalProps } from '@type/common'
import type { TCar } from '@type/car'

import Card from '@common/card/card'
import { LinkButton } from '@common/button/button'

import { Page } from '@constant/links'

import classNames from 'classnames'
import classes from './car-card.module.css'
import { linkGenerator } from '@helper/link-generator'

type TCarProps = {
    car: TCar
}

const CarCard: FC<AdditionalProps<TCarProps>> = ({ car, className }) => {
    const addTripLink = linkGenerator(Page.CreateTrip, { car: car.id })

    return (
        <Card className={classNames(classes.car_card, className)}>
            <div className={classes.image}></div>

            <About car={car} />

            <LinkButton href={addTripLink} title="Add trip" className={classes.add_trip_btn}>
                Add trip
            </LinkButton>
        </Card>
    )
}

const About: FC<TCarProps> = ({ car }) => {
    const { brand, model } = car

    return (
        <div className={classes.about}>
            <h4 className={classes.title}>
                {brand} {model}
            </h4>

            <Desc car={car} />
        </div>
    )
}

const Desc: FC<TCarProps> = ({ car }) => {
    const { type, seats, year, plate } = car

    return (
        <ul className={classes.desc}>
            <li>
                <span>Type:</span> <span>{type}</span>
            </li>
            <li>
                <span>Seats:</span> <span>{seats}</span>
            </li>
            <li>
                <span>Year:</span> <span>{year}</span>
            </li>
            <li>
                <span>Plate:</span> <span>{plate}</span>
            </li>
        </ul>
    )
}

export default CarCard
