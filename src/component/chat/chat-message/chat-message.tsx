import type { FC } from 'react'

import Card from '@common/card/card'

import { Color } from '@constant/colors'
import { getTime } from '@helper/date'

import classNames from 'classnames'
import classes from './chat-message.module.css'

type TChatMessage = {
    text: string
    createdAt: Date
    isOwner?: boolean
}

const ChatMessage: FC<TChatMessage> = ({ text, createdAt, isOwner = false }) => {
    const time = getTime(createdAt)

    return (
        <Card
            className={classNames(classes.message, { [classes.owner]: isOwner }, 'fade-in-up')}
            sx={{ backgroundColor: isOwner ? Color.Primary_05 : Color.Primary_01, paddingBlock: '0.5em' }}
        >
            <div className={classes.message_text}>{text}</div>
            <div className={classes.message_date}>{time}</div>
        </Card>
    )
}

export default ChatMessage
