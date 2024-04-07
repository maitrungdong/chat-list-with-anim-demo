import React from 'react';
import { CSSTransition } from 'react-transition-group';
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
    console.log('@dongmt StickerGroupMessageRowItem props: ', props);
    const nodeRef = React.useRef(null);
    return (
        <CSSTransition
            {...props}
            nodeRef={nodeRef}
            timeout={300}
            classNames={'sgm-row-item'}
            // addEndListener={(done: any) => {
            //     // use the css transitionend event to mark the finish of a transition
            //     nodeRef.current?.addEventListener('transitionend', done, false);
            // }}
            onEnter={(args: any)=> {
                console.log('@dongmt onEnter: ', args , props.message.msgId);
                    while (true) {}
            }}
        >
            <div
                ref={nodeRef}
                className={classNames('sticker-group-message-row-item')}
            >
                {props.children}
            </div>
        </CSSTransition>
    );
});
