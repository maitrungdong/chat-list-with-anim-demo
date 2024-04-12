import React from 'react';
import { StickerMessageType } from '@src/MessageRepository';

export function NormalStickerMessageContent({
    message,
}: {
    message: StickerMessageType;
}) {
    return (
        <div id={message.msgId} className="normal-sticker-message-content">
            <div className="sticker">
                <img
                    className="sticker__thumb"
                    src={message.content.thumbUrl}
                    alt=""
                />
            </div>
        </div>
    );
}
