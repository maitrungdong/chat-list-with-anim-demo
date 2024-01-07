import React from 'react';
import { Flipped, spring } from 'react-flip-toolkit';

import { StickerMessageType } from '../../MessageRepository';

type StickerGroupMessageRowItemProps = {
    className?: string;
    children: React.ReactNode;
    message: StickerMessageType;
};
type StickerGroupMessageRowItemRef = HTMLDivElement;

const onElementAppear = (el: HTMLElement, index: number) => {
    spring({
        //@ts-ignore
        onUpdate: ({opacity, translateYPercent}) => {
            el.style.opacity = opacity;
            el.style.transform = `translateY(${translateYPercent}%)`;
        },
        values: {
            opacity: [0.5, 1],
            translateYPercent: [50, 0], 
        },
        onComplete: () => {
            el.style.opacity = '';
            el.style.transform = '';
        },
        delay: (3 - index) * 100,
    });
};

export default React.forwardRef<
    StickerGroupMessageRowItemRef,
    StickerGroupMessageRowItemProps
>((props, ref) => {
    const msgFlipId = `item-${props.message.msgId}`;
    return (
        <Flipped key={msgFlipId} flipId={msgFlipId} onAppear={onElementAppear}>
            <div
                ref={ref}
                className={`sticker-group-message-row-item ${
                    props.className || ''
                }`}
            >
                {props.children}
            </div>
        </Flipped>
    );
});
