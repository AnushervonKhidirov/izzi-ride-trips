'use client'
import type { FC } from 'react'
import type { TNavigationData } from '@type/navigation'

import { usePathname } from 'next/navigation'

import { List, ListItemButton } from '@mui/material'

import classNames from 'classnames'

import classes from './navigation.module.css'

type TNavigation = {
    data: TNavigationData[]
    className?: string
}

const Navigation: FC<TNavigation> = ({ data, className }) => {
    const pathname = usePathname()

    return (
        <List sx={{ padding: 0 }} className={classNames(classes.navigation, className)}>
            {data.map(({ href, title }) => (
                <ListItemButton
                    LinkComponent={'a'}
                    key={`header-nav-${title}`}
                    href={href}
                    sx={{ borderRadius: '0.25em' }}
                    className={classNames(classes.navigation_item, { [classes.active]: pathname.includes(href) })}
                >
                    {title}
                </ListItemButton>
            ))}
        </List>
    )
}

export default Navigation
