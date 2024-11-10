import type { FC } from 'react'
import type { TCar } from '@type/car'
import type { TProperty } from '@type/common'
import type { TNavigationData } from '@type/navigation'

import Car from '@service/car/car'

import Image, { StaticImageData } from 'next/image'
import Card from '@common/card/card'
import { LinkButton } from '@common/button/button'

import classes from './car-card.module.css'

const CarCard: FC<{ carData: TCar }> = ({ carData }) => {
    const car = new Car(carData)

    return (
        <Card className={classes.car_card} tag="li">
            <CarImage image={car.getImageData()} title={car.getCarName()} />
            <About title={car.getCarName()} properties={car.getProperties()} />
            <Actions links={car.getActionButtons()} />
        </Card>
    )
}

const CarImage: FC<{ title: string; image: StaticImageData }> = ({ title, image }) => {
    const { src, width, height } = image
    return <Image src={src} width={width} height={height} alt={title} className={classes.image} />
}

const About: FC<{ title: string; properties: TProperty[] }> = ({ title, properties }) => {
    return (
        <div className={classes.about}>
            <h4 className={classes.title}>{title}</h4>

            <Desc properties={properties} />
        </div>
    )
}

const Desc: FC<{ properties: TProperty[] }> = ({ properties }) => {
    return (
        <ul className={classes.properties}>
            {properties.map(property => {
                return (
                    <li key={property.key}>
                        <span>{property.name}:</span>
                        <span>{property.value}</span>
                    </li>
                )
            })}
        </ul>
    )
}

const Actions: FC<{ links: TNavigationData[] }> = ({ links }) => {
    return (
        <div className={classes.action_buttons}>
            {links.map(({ href, title }) => {
                return <LinkButton href={href} title={title} className={classes.add_trip_btn} key={href} />
            })}
        </div>
    )
}

export default CarCard
