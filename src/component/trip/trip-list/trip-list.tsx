import type { FC } from 'react'
import type { AdditionalProps, TStyles } from '@type/common'
import type { TTrip } from '@type/trip'

import TripCard from '@component/trip-card/trip-card'
import Card from '@common/card/card'

import classNames from 'classnames'
import classes from './trip-list.module.css'

const TripList: FC<AdditionalProps<{ list: TTrip[] }>> = ({ list, className, children }) => {
    const additionalCardStyles: TStyles = {
        position: 'relative',
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
        paddingBlock: '3em',
    }

    return (
        <ul className={classNames(classes.trip_list, className)}>
            {list.map(trip => {
                return <TripCard tripData={trip} key={trip.id} />
            })}

            {children && (
                <Card className={classes.additional_card} sx={additionalCardStyles}>
                    {children}
                </Card>
            )}
        </ul>
    )
}

export default TripList
