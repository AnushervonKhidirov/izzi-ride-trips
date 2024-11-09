import type { FC, HTMLAttributeAnchorTarget } from 'react'
import type { TooltipProps } from '@mui/material'
import type { AdditionalProps } from '@type/common'

import { CircularProgress, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Tooltip from '@common/tooltip/tooltip'

import classes from './button.module.css'

type TFromBtn = {
    loading: boolean
    title: string
}

type TBtn = {
    title: string
    href?: string
    target?: HTMLAttributeAnchorTarget
    onClick?: () => void
    tooltip?: boolean
    tooltipPlacement?: TooltipProps['placement']
}

export const FormBtn: FC<TFromBtn> = ({ loading, title }) => {
    const buttonStyles = {
        backgroundColor: 'var(--secondary)',
        color: '#fff',
        fontSize: '1em',
        fontFamily: 'inherit',
        textTransform: 'none',
        borderRadius: '0.25em',
        padding: '0.25em 1.5em',
    }

    return (
        <LoadingButton
            className={classes.form_btn}
            loading={loading}
            loadingIndicator={
                <>
                    {title} <CircularProgress className={classes.loading_icon} />
                </>
            }
            size="medium"
            variant="contained"
            type="submit"
            sx={buttonStyles}
        >
            {title}
        </LoadingButton>
    )
}

export const LinkButton: FC<AdditionalProps<TBtn>> = ({
    href,
    target,
    title,
    children,
    tooltip = false,
    tooltipPlacement,
    onClick,
    className,
}) => {
    const buttonStyles = {
        backgroundColor: 'var(--primary)',
        color: '#fff',
        fontSize: '1em',
        fontFamily: 'inherit',
        textTransform: 'none',
        borderRadius: '0.25em',
        padding: '0.25em 1.5em',
    }

    return tooltip ? (
        <Tooltip title={title} placement={tooltipPlacement}>
            <Button href={href ?? ''} target={target} onClick={onClick} variant="contained" className={className} sx={buttonStyles}>
                {children || title}
            </Button>
        </Tooltip>
    ) : (
        <Button href={href ?? ''} target={target} onClick={onClick} variant="contained" className={className} sx={buttonStyles}>
            {children || title}
        </Button>
    )
}
