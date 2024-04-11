import React from 'react';
import { TextMessageType } from '@src/MessageRepository';

type TextMessageContentProps = {
    message: TextMessageType;
};

export function TextMessageContent(props: TextMessageContentProps) {
    const { message } = props;
    return <div className="text-message-content">{message.content}</div>;
}
