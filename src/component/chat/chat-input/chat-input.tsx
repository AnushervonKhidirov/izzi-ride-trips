'use client'
import type { FC } from 'react'
import type { AdditionalProps } from '@type/common'
import type { TFormSubmit } from '@type/form'

import { TextField } from '@mui/material'
import { Button } from '@common/button/button'

import classes from './chat-input.module.css'
import classNames from 'classnames'

const ChatInput: FC<AdditionalProps<{ onSubmit: TFormSubmit }>> = ({ onSubmit, className }) => {
    return (
        <form onSubmit={e => onSubmit(e)} className={classNames(classes.chat_input, className)}>
            <TextField
                name="message"
                placeholder="Message"
                multiline
                slotProps={{ input: { sx: { padding: '0.5em', fontSize: '1em' } } }}
            />
            <Button title="Send" type="submit" />
        </form>
    )
}

export default ChatInput
