import React from 'react';

import { MessageTypes } from './MessageRepository';
import { StickerGroupMessageContent } from './message-contents/StickerGroupMessageContent';
import { TextMessageContent } from './message-contents/TextMessageContent';
import { MessageContentWrapper } from './MessageContentWrapper';

import { useFocusMessage } from './hooks/use-focus-message';

import type { MessageType } from './MessageRepository';

type ChatListItemProps = {
    message: MessageType;
    isJustAdded?: boolean;
    isFocused?: boolean;
};

function ChatListItem(props: ChatListItemProps) {
    const { message, isJustAdded } = props;
    const chatListItemHolder = React.useRef<HTMLDivElement>(null);

    useFocusMessage({
        messageDOMElementRef: chatListItemHolder,
        isJustAdded,
        isFocused: true,
    });

    return (
        <div
            ref={chatListItemHolder}
            className={`chat-list-item ${message.fromMe ? '--me' : ''}`}
        >
            <MessageContentWrapper
                message={message}
                hasFrame={message.msgType === MessageTypes.Text}
            >
                {message.msgType === MessageTypes.Text && (
                    <TextMessageContent message={message} />
                )}
                {message.msgType === MessageTypes.StickerGroup && (
                    <StickerGroupMessageContent message={message} />
                )}
            </MessageContentWrapper>
        </div>
    );
}

export default ChatListItem;
