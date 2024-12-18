'use client'
import type { FormEvent } from 'react'

import ChatList from '../chat-list/chat-list'
// import ChatHeader from '../chat-header/chat-header'
// import ChatMessages from '../chat-messages/chat-messages'
// import ChatInput from '../chat-input/chat-input'

import classes from './chat.module.css'

const Chat = () => {
    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const body = Object.fromEntries(formData)
        console.log(body)
    }

    return (
        <div className={classes.chat}>
            <ChatList />
            {/* <ChatHeader firstName="Denzel" lastName="Hawking" />
            <ChatMessages />
            <ChatInput onSubmit={onSubmit} /> */}
        </div>
    )
}

export default Chat
