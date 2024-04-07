import React from 'react';
import classNames from 'classnames';

import { StickerMessageType } from '../../MessageRepository';

type StickerGroupMessageRowItemProps = {
    className?: string;
    children: React.ReactNode;
    message: StickerMessageType;
};
type StickerGroupMessageRowItemRef = HTMLDivElement;

export default React.forwardRef<
    StickerGroupMessageRowItemRef,
    StickerGroupMessageRowItemProps
>(function StickerGroupMessageRowItem(props, ref) {
    return (
        <div ref={ref} className={classNames('sticker-group-message-row-item')}>
            {props.children}
        </div>
    );
});
