'use client'
import type { FC, FormEvent } from 'react'

import type { TChatMessage, TChatInfo } from '@type/chat'

import ChatHeader from '../chat-header/chat-header'
import ChatMessages from '../chat-messages/chat-messages'
import ChatInput from '../chat-input/chat-input'

import classes from './chat.module.css'

const Chat: FC<TChatInfo & { messages: TChatMessage[] }> = ({ id, firstName, lastName, messages }) => {
    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const body = Object.fromEntries(formData)
        console.log(body)
    }

    return (
        <div className={classes.chat}>
            <ChatHeader id={id} firstName={firstName} lastName={lastName} />
            <ChatMessages messages={messages} />
            <ChatInput onSubmit={onSubmit} />
        </div>
    )
}

export default Chat
