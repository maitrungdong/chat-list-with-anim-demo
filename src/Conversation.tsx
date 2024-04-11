import React from 'react';
import { MessageRepository, MessageType } from './MessageRepository';

import ChatList from './ChatList';
import Input from './Input';

type ConversationProps = {};

function Conversation(props: ConversationProps) {
    const [messageList, setMessageList] = React.useState<MessageType[]>(() =>
        MessageRepository.getInitialMessageList()
    );

    const createNewStickerMessage = () => {
        setMessageList((messageList: MessageType[]) => {
            return [...messageList, MessageRepository.createStickerMessage()];
        });
    };

    const createNewTextMessage = () => {
        setMessageList((messageList: MessageType[]) => {
            return [...messageList, MessageRepository.createTextMessage()];
        });
    };

    const groupedMessageList = MessageRepository.groupMessageList(messageList);
    console.log('@dongmt groupedMessageList: ', groupedMessageList);

    return (
        <div className="conversation">
            <ChatList messageList={groupedMessageList} />
            <Input
                sendNewStickerMessage={createNewStickerMessage}
                sendNewTextMessage={createNewTextMessage}
            />
        </div>
    );
}

export default Conversation;
