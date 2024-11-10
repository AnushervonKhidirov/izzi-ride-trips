import type { ElementType, FC } from 'react'

import { Card as MuiCard } from '@mui/material'
import { AdditionalProps } from '@type/common'

type TCard = AdditionalProps<{
    tag?: ElementType
}>

const Card: FC<TCard> = ({ tag = 'div', children, className }) => {
    return (
        <MuiCard
            component={tag}
            className={className}
            elevation={3}
            sx={{ padding: '1em', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        >
            {children}
        </MuiCard>
    )
}

export default Card
