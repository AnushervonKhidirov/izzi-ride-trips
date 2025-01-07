import type { FC } from 'react'
import type { TChip } from '@type/common'

import Chip from '@common/chip/chip'

import classes from './chip-list.module.css'

const ChipList: FC<{ list: TChip[] }> = ({ list }) => {
    return (
        <div className={classes.list}>
            {list.map(({ name, value }) => {
                return <Chip name={name} value={value} key={name} />
            })}
        </div>
    )
}

export default ChipList
