import React from 'react';

type StickerGroupMessageRowItemProps = {
    className?: string;
    children: React.ReactNode;
};
type StickerGroupMessageRowItemRef = HTMLDivElement;

export default React.forwardRef<
    StickerGroupMessageRowItemRef,
    StickerGroupMessageRowItemProps
>((props, ref) => {
    return (
        <div
            ref={ref}
            className={`sticker-group-message-row-item ${
                props.className || ''
            }`}
        >
            {props.children}
        </div>
    );
});
