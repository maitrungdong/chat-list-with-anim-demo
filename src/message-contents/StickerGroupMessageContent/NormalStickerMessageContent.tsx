import React from 'react';
import { StickerMessageType } from '@src/MessageRepository';

type Ref = HTMLDivElement;
export const NormalStickerMessageContent = React.forwardRef<
    Ref,
    {
        message: StickerMessageType;
    }
>(function NormalStickerMessageContent({ message }, ref) {
    return (
        <div
            ref={ref}
            id={message.msgId}
            className="normal-sticker-message-content"
        >
            <div className="sticker">
                <img
                    className="sticker__thumb"
                    src={message.content.thumbUrl}
                    alt=""
                />
            </div>
        </div>
    );
});
