import React from 'react';

import { MessageTypes } from './MessageRepository';
import { StickerGroupMessageContent } from './message-contents/StickerGroupMessageContent';
import { TextMessageContent } from './message-contents/TextMessageContent';
import { useFocusMessage } from './hooks/use-focus-message';

type ChatListItemProps = {
    message: any;
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
            {message.msgType === MessageTypes.Text && (
                <TextMessageContent message={message} />
            )}
            {message.msgType === MessageTypes.StickerGroup && (
                <StickerGroupMessageContent message={message} />
            )}
        </div>
    );
}

export default ChatListItem;
