import React from 'react';

type StickerGroupMessageRowProps = {
    children: React.ReactNode;
};

function StickerGroupMessageRow(props: StickerGroupMessageRowProps) {
    return <div className="sticker-group-message-row">{props.children}</div>;
}

export default StickerGroupMessageRow;
