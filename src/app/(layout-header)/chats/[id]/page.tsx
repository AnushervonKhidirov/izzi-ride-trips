'use client'
import { useParams } from 'next/navigation'

const ChatPage = () => {
    const params = useParams()

    return <div>{params.id}</div>
}

export default ChatPage
