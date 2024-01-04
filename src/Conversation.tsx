import React from 'react';

import ChatList from './ChatList';

type ConversationProps = {
    messageList: any[];
};

function Conversation(props: ConversationProps) {
    const { messageList } = props;

    return (
        <div className="conversation">
            <ChatList messageList={messageList} />
        </div>
    );
}

export default Conversation;
