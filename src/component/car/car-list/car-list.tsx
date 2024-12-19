import type { FC } from 'react'
import type { AdditionalProps, TStyles } from '@type/common'
import type { TCar } from '@type/car'

import ScrolledContent from '@common/scrolled-content/scrolled-content'
import CarCard from '../car-card/car-card'
import Card from '@common/card/card'

import classNames from 'classnames'
import classes from './car-list.module.css'

const CarList: FC<AdditionalProps<{ list: TCar[] }>> = ({ list, className, children }) => {
    const additionalCardStyles: TStyles = {
        position: 'relative',
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
        paddingBlock: '3em',
    }

    return (
        <ScrolledContent className={classNames(classes.car_list, className)}>
            {list.map(car => {
                return <CarCard carData={car} key={car.id} />
            })}

            {children && (
                <Card className={classes.additional_card} tag="li" sx={additionalCardStyles}>
                    {children}
                </Card>
            )}
        </ScrolledContent>
    )
}

export default CarList
