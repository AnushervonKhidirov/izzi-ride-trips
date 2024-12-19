'use client'
import type { TChatMessage } from '@type/chat'

import { useParams } from 'next/navigation'

import Chat from '@component/chat/chat-wrapper/chat'

const messages: TChatMessage[] = [
    {
        id: 1,
        userId: 3,
        createdAt: new Date('12/19/2024 08:57:00'),
        text: 'Hello MTF!!',
    },
    {
        id: 2,
        userId: 1,
        createdAt: new Date('12/19/2024 09:02:00'),
        text: 'Hello MTF!!',
    },
    {
        id: 3,
        userId: 1,
        createdAt: new Date('12/19/2024 09:05:00'),
        text: 'Wjldsf?',
    },
    {
        id: 4,
        userId: 3,
        createdAt: new Date('12/19/2024 09:07:00'),
        text: '?????!!dfsafasdf',
    },
    {
        id: 5,
        userId: 3,
        createdAt: new Date('12/19/2024 09:07:00'),
        text: 'dfsafasdf fasd',
    },
    {
        id: 6,
        userId: 3,
        createdAt: new Date('12/19/2024 09:07:00'),
        text: 'dfsafasdf fasd',
    },
    {
        id: 7,
        userId: 3,
        createdAt: new Date('12/19/2024 09:07:00'),
        text: 'dfsafasdf fasd',
    },
    {
        id: 8,
        userId: 1,
        createdAt: new Date('12/19/2024 09:07:00'),
        text: 'dfsafasdf fasd',
    },
    {
        id: 9,
        userId: 1,
        createdAt: new Date('12/19/2024 09:07:00'),
        text: 'dfsafasdf fasd',
    },
    {
        id: 10,
        userId: 3,
        createdAt: new Date('12/19/2024 09:07:00'),
        text: 'dfsafasdf fasd',
    },
    {
        id: 11,
        userId: 1,
        createdAt: new Date('12/19/2024 09:07:00'),
        text: 'dfsafasdf fasd',
    },
    {
        id: 12,
        userId: 3,
        createdAt: new Date('12/19/2024 09:07:00'),
        text: 'dfsafasdf fasd',
    },
    {
        id: 13,
        userId: 3,
        createdAt: new Date('12/19/2024 09:07:00'),
        text: 'dfsafasdf fasd',
    },
    {
        id: 14,
        userId: 1,
        createdAt: new Date('12/19/2024 09:07:00'),
        text: 'dfsafasdf fasd',
    },
    {
        id: 15,
        userId: 3,
        createdAt: new Date('12/19/2024 09:07:00'),
        text: 'dfsafasdf fasd',
    },
    {
        id: 16,
        userId: 1,
        createdAt: new Date('12/19/2024 09:07:00'),
        text: 'dfsafasdf fasd?',
    },
    {
        id: 17,
        userId: 1,
        createdAt: new Date('12/19/2024 09:07:00'),
        text: 'dfsafasdf fasd?',
    },
]

const ChatPage = () => {
    const params = useParams<{ id: string }>()

    return <Chat id={params.id} firstName="Denzel" lastName="Hawking" messages={messages} />
}

export default ChatPage
