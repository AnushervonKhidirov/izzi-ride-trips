import type { Metadata } from 'next'
import type { FC } from 'react'
import './globals.css'

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

const RootLayout: FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}

export default RootLayout
