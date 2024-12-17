'use client'
import type { FormEvent } from 'react'

import ChatInput from '@component/chat/chat-input/chat-input'

const Chat = () => {
    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const body = Object.fromEntries(formData)
        console.log(body)
    }

    return (
        <div>
            <ChatInput onSubmit={onSubmit} />
        </div>
    )
}

export default Chat
