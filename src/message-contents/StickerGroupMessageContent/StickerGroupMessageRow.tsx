import React from 'react';
import FlipMove from 'react-flip-move';

function StickerGroupMessageRow(props: any) {
    return (
        <FlipMove className="sticker-group-message-row">
            {props.children}
        </FlipMove>
    );
}

export default StickerGroupMessageRow;
