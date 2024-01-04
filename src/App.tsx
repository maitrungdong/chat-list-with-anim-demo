import React from 'react';
import { MessageRepository } from './MessageRepository';

import Conversation from './Conversation';
import Input from './Input';

function App() {
    const [messageList, setMessageList] = React.useState(() =>
        MessageRepository.getInitialMessageList()
    );

    const createNewStickerMessage = () => {
        setMessageList((messageList: any[]) => {
            return [...messageList, MessageRepository.createStickerMessage()];
        });
    };

    const createNewTextMessage = () => {
        setMessageList((messageList: any[]) => {
            return [...messageList, MessageRepository.createTextMessage()];
        });
    };

    const groupedMessageList = MessageRepository.groupMessageList(messageList);

    return (
        <div className="app">
            <Conversation messageList={groupedMessageList} />
            <Input
                sendNewStickerMessage={createNewStickerMessage}
                sendNewTextMessage={createNewTextMessage}
            />
        </div>
    );
}

export default App;
