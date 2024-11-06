'use client'
import type { FC } from 'react'

import { useState } from 'react'

import { IconButton } from '@mui/material'
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'

import classNames from 'classnames'

const HamburgerMenu: FC<{ className?: string }> = ({ className }) => {
    const [opened, setOpened] = useState(false)

    function menuHandler() {
        setOpened(!opened)
    }

    return (
        <IconButton
            className={classNames(className)}
            onClick={menuHandler}
            style={{ fontSize: '1em', width: '3em', height: '3em' }}
            size="medium"
        >
            {opened ? <CloseIcon sx={{ fontSize: '2em' }} /> : <MenuIcon sx={{ fontSize: '2em' }} />}
        </IconButton>
    )
}

export default HamburgerMenu
