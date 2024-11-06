import type { FC } from 'react'
import type { AdditionalProps } from '@type/common'
import type { TCar } from '@type/car'

import Image, { StaticImageData } from 'next/image'
import Card from '@common/card/card'
import { LinkButton } from '@common/button/button'

import carImage from '@public/images/car.png'
import { Page } from '@constant/links'
import { linkGenerator } from '@helper/link-generator'
import classNames from 'classnames'

import classes from './car-card.module.css'

type TCarProps = {
    car: TCar
}

const CarCard: FC<AdditionalProps<TCarProps>> = ({ car, className }) => {
    const addTripLink = linkGenerator(Page.CreateTrip, { car: car.id })

    return (
        <Card className={classNames(classes.car_card, className)}>
            <CarImage image={carImage} title={car.brand} />

            <About car={car} />

            <LinkButton href={addTripLink} title="Add trip" className={classes.add_trip_btn} />
        </Card>
    )
}

const CarImage: FC<{ title: string; image: StaticImageData | string }> = ({ title, image }) => {
    const imageData = typeof image === 'object' ? image : { src: image, width: 300, height: 300 }
    return <Image src={imageData.src} width={imageData.width} height={imageData.height} alt={title} className={classes.image} />
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
