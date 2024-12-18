import ChatMessage from '../chat-message/chat-message'

import classes from './chat-messages.module.css'

const ChatMessages = () => {
    
    return (
        <div className={classes.chat_messages}>
            <ChatMessage id={1} text='hello mtf' createdAt={new Date()} />
            <ChatMessage id={1} text='hello mtf' createdAt={new Date()} isOwner />
        </div>
    )
}

export default ChatMessages
