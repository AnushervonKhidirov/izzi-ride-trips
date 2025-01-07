import type { FC } from 'react'
import { TChip } from '@type/common'

import classNames from 'classnames'
import classes from './chip.module.css'

const Chip: FC<TChip> = ({ name, value }) => {
    return <div className={classNames(classes.chip, { [classes.active]: value })}>{name}</div>
}

export default Chip
