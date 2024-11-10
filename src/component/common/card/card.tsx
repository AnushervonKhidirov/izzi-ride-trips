import type { FC, ElementType } from 'react'
import type { AdditionalProps, TStyles } from '@type/common'

import { Card as MuiCard } from '@mui/material'

type TCard = AdditionalProps<{
    tag?: ElementType
    sx?: TStyles
}>

const Card: FC<TCard> = ({ tag = 'div', sx, children, className }) => {
    return (
        <MuiCard
            component={tag}
            className={className}
            elevation={3}
            sx={{ padding: '1em', backgroundColor: 'rgba(0, 0, 0, 0.05)', ...sx }}
        >
            {children}
        </MuiCard>
    )
}

export default Card
