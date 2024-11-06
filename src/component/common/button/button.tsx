import type { FC, HTMLAttributeAnchorTarget } from 'react'
import type { TooltipProps } from '@mui/material'
import type { AdditionalProps } from '@type/common'

import { CircularProgress, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Tooltip from '@common/tooltip/tooltip'

import classNames from 'classnames'
import classes from './button.module.css'

type TFromBtn = {
    loading: boolean
    title: string
}

type TLinkBtn = {
    title: string
    href: string
    target?: HTMLAttributeAnchorTarget
    tooltipPlacement?: TooltipProps['placement']
}

export const FormBtn: FC<TFromBtn> = ({ loading, title }) => {
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
            title={title}
            type="submit"
        >
            {title}
        </LoadingButton>
    )
}

export const LinkButton: FC<AdditionalProps<TLinkBtn>> = ({
    href,
    target,
    title,
    children,
    tooltipPlacement,
    className,
}) => {
    return (
        <Tooltip title={title} placement={tooltipPlacement}>
            <Button
                href={href}
                target={target}
                variant="contained"
                className={classNames(classes.link_btn, className)}
                sx={{ fontFamily: 'inherit' }}
            >
                {children}
            </Button>
        </Tooltip>
    )
}
