import type { FC } from 'react'
import type { TChatMessage } from '@type/chat'

import ChatMessage from '../chat-message/chat-message'
import ScrolledContent from '@common/scrolled-content/scrolled-content'

import classes from './chat-messages.module.css'

const ChatMessages: FC<{ messages: TChatMessage[] }> = ({ messages }) => {
    const ownerId = 1

    return (
        <ScrolledContent className={classes.chat_messages} autoScrollToBottom>
            {messages.map(message => {
                return (
                    <ChatMessage
                        text={message.text}
                        createdAt={message.createdAt}
                        key={message.id}
                        isOwner={message.userId === ownerId}
                    />
                )
            })}
        </ScrolledContent>
    )
}

export default ChatMessages
