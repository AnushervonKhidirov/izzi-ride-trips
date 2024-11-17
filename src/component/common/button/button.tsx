import type { FC, HTMLAttributeAnchorTarget } from 'react'
import type { TooltipProps } from '@mui/material'
import type { AdditionalProps, TStyles } from '@type/common'

import { CircularProgress, Button as MuiButton } from '@mui/material'
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
    type?: HTMLButtonElement['type']
    onClick?: () => void
    tooltip?: boolean
    tooltipPlacement?: TooltipProps['placement']
    sx?: TStyles
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

export const Button: FC<AdditionalProps<TBtn>> = ({
    href,
    target,
    title,
    children,
    tooltip = false,
    tooltipPlacement,
    type,
    onClick,
    className,
    sx,
}) => {
    const buttonStyles = {
        backgroundColor: 'var(--primary)',
        color: '#fff',
        fontSize: '1em',
        fontFamily: 'inherit',
        textTransform: 'none',
        borderRadius: '0.25em',
        padding: '0.25em 1.5em',
        ...sx,
    }

    return tooltip ? (
        <Tooltip title={title} placement={tooltipPlacement}>
            <MuiButton
                href={href ?? ''}
                target={target}
                onClick={onClick}
                type={type}
                variant="contained"
                className={className}
                sx={buttonStyles}
            >
                {children || title}
            </MuiButton>
        </Tooltip>
    ) : (
        <MuiButton
            href={href ?? ''}
            target={target}
            type={type}
            onClick={onClick}
            variant="contained"
            className={className}
            sx={buttonStyles}
        >
            {children || title}
        </MuiButton>
    )
}
