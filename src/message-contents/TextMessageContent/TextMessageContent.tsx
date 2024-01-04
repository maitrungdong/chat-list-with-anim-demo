import React from 'react';
import { TextMessageType } from '../../MessageRepository';

type TextMessageContentProps = {
    message: TextMessageType;
};

function TextMessageContent(props: TextMessageContentProps) {
    const { message } = props;
    return <div className="text-message-content">{message.content}</div>;
}

export default TextMessageContent;
