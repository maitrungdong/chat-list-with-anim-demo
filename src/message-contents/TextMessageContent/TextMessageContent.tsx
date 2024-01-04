import React from 'react';

type TextMessageContentProps = {
    message: any;
};

function TextMessageContent(props: TextMessageContentProps) {
    const { message } = props;
    return <div className="text-message-content">{message.content}</div>;
}

export default TextMessageContent;
