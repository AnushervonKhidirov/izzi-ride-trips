import type { FC } from 'react'
import type { AdditionalProps } from '@type/common'
import type { TChatInfo } from '@type/chat'

import Link from 'next/link'

import { AccountCircle } from '@mui/icons-material'
import Section from '@common/section/section'
import Tooltip from '@common/tooltip/tooltip'
import Typing from '../typing/typing'

import { Color } from '@constant/colors'
import { ClassNames } from '@constant/classnames'

import classNames from 'classnames'
import classes from './chat-list.module.css'
import { Page } from '@constant/links'

const ChatList = () => {
    return (
        <Section title="Your chats">
            <ul className={classes.chat_list}>
                <li>
                    <ChatItem id={44123} firstName="Denzel" lastName="Hawking 2">
                        Last message text 1
                    </ChatItem>
                </li>

                <li>
                    <ChatItem id={41243} firstName="Denzel" lastName="Hawking 1">
                        <Typing />
                    </ChatItem>
                </li>

                <li>
                    <ChatItem id={41213} firstName="Denzel" lastName="Hawking 3">
                        Last message text 2
                    </ChatItem>
                </li>
            </ul>
        </Section>
    )
}

const ChatItem: FC<AdditionalProps<TChatInfo>> = ({ id, firstName, lastName, className, children }) => {
    const chatLink = Page.Chat.replace('[id]', id.toString())

    return (
        <Tooltip title={`Chat with ${firstName}`} followCursor>
            <Link
                href={chatLink}
                shallow
                className={classNames(classes.chat_item, className, ClassNames.button_without_styles)}
            >
                <AccountCircle
                    className={classes.user_icon}
                    style={{ width: '100%', height: '100%', fill: Color.Secondary }}
                />

                <div className={classes.user_name}>
                    {firstName} {lastName}
                </div>

                {children && <div className={classes.additional}>{children}</div>}
            </Link>
        </Tooltip>
    )
}

export default ChatList
