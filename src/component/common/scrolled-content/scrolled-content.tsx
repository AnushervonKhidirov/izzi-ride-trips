import type { FC } from 'react'
import type { AdditionalProps } from '@type/common'

import { useState, useEffect, useRef } from 'react'

import classNames from 'classnames'
import classes from './scrolled-content.module.css'

type TScrolledContent = {
    autoScrollToBottom?: boolean
}

const ScrolledContent: FC<AdditionalProps<TScrolledContent>> = ({
    autoScrollToBottom = false,
    className,
    children,
}) => {
    const [scrolled, setScrolled] = useState(false)
    const [showContent, setShowContent] = useState(!autoScrollToBottom)

    const contentRef = useRef<HTMLDivElement>(null)

    function autoScroll() {
        if (!contentRef.current) return

        const bottomScrollPosition =
            contentRef.current.scrollHeight - (contentRef.current.clientHeight + contentRef.current.scrollTop)

        const shouldScroll = bottomScrollPosition === 0 || !showContent

        if (!shouldScroll) return

        const scrollOptions: ScrollToOptions = {
            top: contentRef.current.scrollHeight,
            behavior: showContent ? 'smooth' : 'auto',
        }

        contentRef.current.scrollTo(scrollOptions)
        setScrolled(true)

        if (!showContent) setShowContent(true)
    }

    useEffect(() => {
        if (!scrolled) autoScroll()
    }, [contentRef.current, scrolled])

    useEffect(() => {
        setScrolled(false)
    }, [children])

    return (
        <div className={classNames(classes.content, { [classes.show]: showContent })}>
            <div className={className} ref={contentRef}>
                {children}
            </div>
        </div>
    )
}

export default ScrolledContent
