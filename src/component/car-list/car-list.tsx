import type { FC } from 'react'
import type { AdditionalProps } from '@type/common'
import type { TCar } from '@type/car'

import CarCard from '@component/car-card/car-card'

import classNames from 'classnames'
import classes from './car-list.module.css'

const CarList: FC<AdditionalProps<{ title?: string; list: TCar[] }>> = ({ title, list, className }) => {
    return (
        <div className={classNames(classes.cars, className)}>
            {title && <h2 className={classes.headline}>{title}</h2>}

            <ul className={classes.car_list}>
                {list.map(car => {
                    return <CarCard carData={car} key={car.id} />
                })}
            </ul>
        </div>
    )
}

export default CarList
