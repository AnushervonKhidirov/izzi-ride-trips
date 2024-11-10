import type { FC } from 'react'
import type { AdditionalProps } from '@type/common'
import type { TCar } from '@type/car'

import CarCard from '@component/car-card/car-card'
import Card from '@common/card/card'

import classNames from 'classnames'
import classes from './car-list.module.css'

const CarList: FC<AdditionalProps<{ list: TCar[] }>> = ({ list, className, children }) => {
    return (
        <ul className={classNames(classes.car_list, className)}>
            {list.map(car => {
                return <CarCard carData={car} key={car.id} />
            })}

            {children && (
                <Card className={classes.additional_card} tag="li">
                    {children}
                </Card>
            )}
        </ul>
    )
}

export default CarList
