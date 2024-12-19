import type { FC } from 'react'
import type { TChatInfo } from '@type/chat'

import Link from 'next/link'
import { IconButton } from '@mui/material'
import { KeyboardBackspaceRounded } from '@mui/icons-material'
import Tooltip from '@common/tooltip/tooltip'

import classes from './chat-header.module.css'
import { Page } from '@constant/links'

const ChatHeader: FC<TChatInfo> = ({ firstName, lastName }) => {
    return (
        <div className={classes.chat_header}>
            <div className={classes.user_name}>
                {firstName} {lastName}
            </div>
            <div className={classes.status}>Online</div>

            <div className={classes.back_btn}>
                <Tooltip title="Back">
                    <Link href={Page.Chats} shallow>
                        <IconButton size="small">
                            <KeyboardBackspaceRounded sx={{ fontSize: '2em' }} />
                        </IconButton>
                    </Link>
                </Tooltip>
            </div>
        </div>
    )
}

export default ChatHeader
