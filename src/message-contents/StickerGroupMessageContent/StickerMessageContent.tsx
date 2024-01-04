import React from 'react';

function StickerMessageContent(props: any) {
    const { message } = props;

    return (
        <div className="sticker-message-content">
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

export default StickerMessageContent;
