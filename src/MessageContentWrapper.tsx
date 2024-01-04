import React from 'react';
import type { MessageType } from './MessageRepository';
import moment from 'moment';
moment.locale();

type MessageContentWrapperProps = {
    message: MessageType;
    hasFrame?: boolean;
    children: React.ReactNode;
};

export function MessageContentWrapper(props: MessageContentWrapperProps) {
    return (
        <div
            className={`message-content-wrapper ${
                props.hasFrame ? '--has-frame' : ''
            } ${props.message.fromMe ? '--me' : ''}`}
        >
            {props.children}
            {props.hasFrame && (
                <div className="message-content-wrapper__sent-time">
                    {moment(props.message.senDttm).format('HH:mm, DD/MM/YYYY')}
                </div>
            )}
        </div>
    );
}
