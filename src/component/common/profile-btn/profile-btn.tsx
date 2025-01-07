import type { FC } from 'react'
import type { TUser } from '@type/auth'
import type { AdditionalProps } from '@type/common'

import Link from 'next/link'
import { AccountCircle } from '@mui/icons-material'
import Tooltip from '@common/tooltip/tooltip'

import classNames from 'classnames'
import { Page } from '@constant/links'
import { Color } from '@constant/colors'
import classes from './profile-btn.module.css'

const ProfileButton: FC<AdditionalProps<TUser>> = ({ username, first_name, last_name, className }) => {
    const name = getName()

    function getName() {
        if (first_name && last_name) return `${first_name} ${first_name}`
        if (first_name && !last_name) return first_name
        if (last_name && !first_name) return last_name
        return username
    }

    return (
        <Tooltip title="Profile" followCursor>
            <Link href={Page.Profile} className={classNames(classes.profile_btn, className)}>
                <AccountCircle
                    className={classes.profile_icon}
                    style={{ width: '100%', height: '100%', fill: Color.Secondary }}
                />
                <div className={classes.user_name}>{name}</div>
            </Link>
        </Tooltip>
    )
}

export default ProfileButton
