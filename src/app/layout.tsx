import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import localFont from 'next/font/local'

import './globals.css'

export const metadata: Metadata = {
    title: 'iZZi Ride Trips',
}

const roboto = localFont({
    src: [
        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-Thin.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-ThinItalic.woff2',
            weight: '100',
            style: 'italic',
        },

        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-ExtraLight.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-ExtraLightItalic.woff2',
            weight: '200',
            style: 'italic',
        },

        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-LightItalic.woff2',
            weight: '300',
            style: 'italic',
        },

        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-Italic.woff2',
            weight: '400',
            style: 'italic',
        },

        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-MediumItalic.woff2',
            weight: '500',
            style: 'italic',
        },

        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-SemiBold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-SemiBoldItalic.woff2',
            weight: '600',
            style: 'italic',
        },

        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-BoldItalic.woff2',
            weight: '700',
            style: 'italic',
        },

        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-ExtraBold.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-ExtraBoldItalic.woff2',
            weight: '800',
            style: 'italic',
        },

        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-Black.woff2',
            weight: '900',
            style: 'normal',
        },
        {
            path: '../../public/fonts/roboto-condensed/RobotoCondensed-BlackItalic.woff2',
            weight: '900',
            style: 'italic',
        },
    ],
})

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html lang="en">
            <body className={roboto.className}>
                {children}
            </body>
        </html>
    )
}

export default RootLayout
