import type { FC } from 'react'

import { IconButton } from '@mui/material'
import { KeyboardBackspaceRounded } from '@mui/icons-material'
import Tooltip from '@common/tooltip/tooltip'

import classes from './chat-header.module.css'

type TChatHeader = {
    firstName: string
    lastName: string
}

const ChatHeader: FC<TChatHeader> = ({ firstName, lastName }) => {
    return (
        <div className={classes.chat_header}>
            <div className={classes.user_name}>
                {firstName} {lastName}
            </div>
            <div className={classes.status}>Online</div>

            <div className={classes.back_btn}>
                <Tooltip title="Back">
                    <IconButton size="small">
                        <KeyboardBackspaceRounded sx={{ fontSize: '2em' }} />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default ChatHeader
