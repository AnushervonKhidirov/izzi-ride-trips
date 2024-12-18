import type { FC } from 'react'

import Card from '@common/card/card'

import classNames from 'classnames'
import classes from './chat-message.module.css'
import { Color } from '@constant/colors'

type TChatMessage = {
    id: number
    text: string
    createdAt: Date
    isOwner?: boolean
}

const ChatMessage: FC<TChatMessage> = ({ id, text, createdAt, isOwner = false }) => {
    return (
        <Card
            className={classNames(classes.message, { [classes.owner]: isOwner }, 'fade-in-up')}
            sx={{ backgroundColor: isOwner ? Color.Primary_05 : Color.Primary_01, paddingBlock: '0.5em' }}
            key={id}
        >
            <div className={classes.message_text}>{text}</div>
            <div className={classes.message_date}>{`${createdAt.getHours()}:${createdAt.getMinutes()}`}</div>
        </Card>
    )
}

export default ChatMessage
