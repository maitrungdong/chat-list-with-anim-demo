import React from 'react';

import ChatListItem from './ChatListItem';
import { usePreviousValue } from './hooks/use-previous-value';

type ChatListProps = {
    messageList: any[];
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
                        prevMessageList &&
                        messageList[messageList.length - 2].msgId ===
                            prevMessageList[prevMessageList.length - 1].msgId
                );
                return (
                    <ChatListItem
                        key={message.msgId}
                        message={message}
                        isJustAdded={isLastInList && isNewMessage}
                    />
                );
            })}
        </div>
    );
}

export default ChatList;
