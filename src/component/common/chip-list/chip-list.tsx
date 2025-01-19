import type { FC } from 'react'
import type { AdditionalProps, TChip } from '@type/common'

import Chip from '@common/chip/chip'

import classNames from 'classnames'
import classes from './chip-list.module.css'

const ChipList: FC<AdditionalProps<{ list: TChip[] }>> = ({ list, className }) => {
    return (
        <div className={classNames(classes.list, className)}>
            {list.map(({ name, value }) => {
                return <Chip name={name} value={value} key={name} />
            })}
        </div>
    )
}

export default ChipList
