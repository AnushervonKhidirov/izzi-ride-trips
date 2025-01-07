import type { TUser } from '@type/auth'

import { headers } from 'next/headers'

import Navigation from '@common/navigation/navigation'
import ProfileButton from '@common/profile-btn/profile-btn'

import { Headers } from '@constant/headers'
import { navigation } from './constant'
import classes from './header.module.css'

const Header = async () => {
    const headerList = await headers()
    const userHeader = headerList.get(Headers.User)
    const user = userHeader ? (JSON.parse(userHeader) as TUser) : null

    return (
        user && (
            <header className={classes.header}>
                <ProfileButton {...user} />
                <Navigation className={classes.navigation} data={navigation} />
            </header>
        )
    )
}

export default Header
