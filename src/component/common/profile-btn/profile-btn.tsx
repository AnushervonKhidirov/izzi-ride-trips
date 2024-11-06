import type { FC } from 'react'
import type { TUser } from '@type/auth'

import Link from 'next/link'
import { AccountCircle } from '@mui/icons-material'
import Tooltip from '@common/tooltip/tooltip'

import classNames from 'classnames'
import { Page } from '@constant/links'
import { Color } from '@constant/colors'
import classes from './profile-btn.module.css'

type TProfileButton = TUser & {
    className?: string
}

const ProfileButton: FC<TProfileButton> = ({ firstName, lastName, className }) => {
    return (
        <Tooltip title="Profile" followCursor>
            <Link href={ Page.Profile} className={classNames(classes.profile_btn, className)}>
                <AccountCircle
                    className={classes.profile_icon}
                    style={{ width: '100%', height: '100%', fill: Color.Secondary }}
                />
                <div className={classes.user_name}>
                    {firstName} {lastName}
                </div>
            </Link>
        </Tooltip>
    )
}

export default ProfileButton
