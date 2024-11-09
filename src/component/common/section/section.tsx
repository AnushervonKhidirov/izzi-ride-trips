import type { FC } from 'react'
import { AdditionalProps } from '@type/common'

import classNames from 'classnames'
import classes from './section.module.css'

const Section: FC<AdditionalProps<{ title?: string }>> = ({ title, className, children }) => {
    return (
        <section className={classNames(classes.section, className)}>
            {title && <h2 className={classes.headline}>{title}</h2>}
            {children}
        </section>
    )
}

export default Section
