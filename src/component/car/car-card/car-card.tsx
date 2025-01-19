import type { FC } from 'react'
import type { TCar } from '@type/car'
import type { TProperty } from '@type/common'
import type { TNavigationData } from '@type/navigation'
import type { StaticImageData } from 'next/image'

import Car from '@service/car/car'

import Image from 'next/image'
import Card from '@common/card/card'
import { Button } from '@common/button/button'
import ChipList from '@common/chip-list/chip-list'

import classes from './car-card.module.css'

const CarCard: FC<{ carData: TCar }> = ({ carData }) => {
    const car = new Car(carData)

    return (
        <Card className={classes.car_card} tag="li">
            <CarImage image={car.getImageData()} title={car.getCarName()} />
            <About title={car.getCarName()} properties={car.getProperties()} />
            <ChipList className={classes.preferences} list={car.getPreferences()} />
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
            {properties.map(({ name, value }) => {
                if (name === 'Color') {
                    console.log('name', name);
                    console.log('value', value);
                }
                
                return value && (
                    <li key={name}>
                        <span>{name}:</span>
                        {name === 'Color' ? (
                            <span className={classes.color} style={{ backgroundColor: value.toString() }}></span>
                        ) : (
                            <span>{value}</span>
                        )}
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
                return <Button href={href} title={title} className={classes.add_trip_btn} key={href} />
            })}
        </div>
    )
}

export default CarCard
