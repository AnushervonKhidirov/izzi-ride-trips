import type { FC } from 'react'
import type { AdditionalProps, TStyles } from '@type/common'
import type { TTrip } from '@type/trip'

import ScrolledContent from '@common/scrolled-content/scrolled-content'
import Card from '@common/card/card'
import TripCard from '../trip-card/trip-card'

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
        <ScrolledContent className={classNames(classes.trip_list, className)}>
            {children && (
                <Card className={classes.additional_card} sx={additionalCardStyles}>
                    {children}
                </Card>
            )}
            
            {list.map(trip => {
                return <TripCard tripData={trip} key={trip.id} />
            })}
        </ScrolledContent>
    )
}

export default TripList
