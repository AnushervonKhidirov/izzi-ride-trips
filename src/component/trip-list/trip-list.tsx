import type { FC } from 'react'
import type { AdditionalProps } from '@type/common'
import type { TTrip } from '@type/trip'

import TripCard from '@component/trip-card/trip-card'
import Card from '@common/card/card'

import classNames from 'classnames'
import classes from './trip-list.module.css'

const TripList: FC<AdditionalProps<{ list: TTrip[] }>> = ({ list, className, children }) => {
    return (
        <ul className={classNames(classes.trip_list, className)}>
            {list.map(trip => {
                return <TripCard tripData={trip} key={trip.id} />
            })}

            {children && <Card className={classes.additional_card}>{children}</Card>}
        </ul>
    )
}

export default TripList
