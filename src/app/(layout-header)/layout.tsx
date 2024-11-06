import type { ReactNode } from 'react'

import Header from '@common/header/header'

const HeaderLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    )
}

export default HeaderLayout
