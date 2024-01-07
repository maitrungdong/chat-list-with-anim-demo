import React from 'react';

import ChatListItem from './ChatListItem';
import { usePreviousValue } from './hooks/use-previous-value';
import { MessageType } from './MessageRepository';
import { FocusDirection } from './animation/vertical-scroll-animation/constants';

type ChatListProps = {
    messageList: MessageType[];
};

function ChatList(props: ChatListProps) {
    const { messageList } = props;
    const prevMessageList = usePreviousValue(messageList);

    return (
        <div className="chat-list">
            {messageList.map((message, messageIdx) => {
                const isLastInList = messageIdx === messageList.length - 1;
                const isNewMessage = Boolean(
                    messageList &&
                        (!prevMessageList ||
                            messageList[messageList.length - 2].msgId ===
                                prevMessageList[prevMessageList.length - 1]
                                    .msgId)
                );
                const isJustAdded = isLastInList && isNewMessage;
                const direction_ =
                    isJustAdded && !prevMessageList
                        ? FocusDirection.Static
                        : undefined;
                return (
                    <ChatListItem
                        key={message.msgId}
                        message={message}
                        isJustAdded={isJustAdded}
                        direction={direction_}
                    />
                );
            })}
        </div>
    );
}

export default ChatList;
