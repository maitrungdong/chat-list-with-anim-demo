import React from 'react';
import classNames from 'classnames';

import { MessageTypes } from './MessageRepository';
import {
    AnimatedStickerGroupMessageContent,
    StaticStickerGroupMessageContent,
} from './message-contents/StickerGroupMessageContent';
import { TextMessageContent } from './message-contents/TextMessageContent';
import { MessageContentWrapper } from './MessageContentWrapper';
import { FocusDirection } from './animation/vertical-scroll-animation/constants';

import { useFocusMessage } from './hooks/use-focus-message';

import type { MessageType } from './MessageRepository';

type ChatListItemProps = {
    message: MessageType;
    isJustAdded?: boolean;
    isFocused?: boolean;
    direction?: FocusDirection;
};

function ChatListItem(props: ChatListItemProps) {
    const { message, isJustAdded } = props;
    const chatListItemHolder = React.useRef<HTMLDivElement>(null);

    useFocusMessage({
        messageDOMElementRef: chatListItemHolder,
        isJustAdded,
        direction: props.direction,
    });

    return (
        <div
            ref={chatListItemHolder}
            className={classNames(`chat-list-item`, message.fromMe && '--me')}
        >
            <MessageContentWrapper
                message={message}
                hasFrame={message.msgType === MessageTypes.Text}
            >
                {message.msgType === MessageTypes.Text && (
                    <TextMessageContent message={message} />
                )}
                {message.msgType === MessageTypes.StickerGroup &&
                    (isJustAdded ? (
                        <AnimatedStickerGroupMessageContent
                            isJustAdded={isJustAdded}
                            message={message}
                        />
                    ) : (
                        <StaticStickerGroupMessageContent message={message} />
                    ))}
            </MessageContentWrapper>
        </div>
    );
}

export default ChatListItem;
