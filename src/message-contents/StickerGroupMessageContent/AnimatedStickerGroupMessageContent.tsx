import React from 'react';
import classNames from 'classnames';
import TransitionGroup from '../../react-transition-group-next-ver/TransitionGroup';
import CSSTransition from '../../react-transition-group-next-ver/CSSTransition';
import SwitchTransition from '../../react-transition-group-next-ver/SwitchTransition';
import type { StickerGroupMessageType } from '@src/MessageRepository';
import { NormalStickerMessageContent } from './NormalStickerMessageContent';

export type AnimatedStickerGroupMessageContentProps = {
    isJustAdded?: boolean;
    message: StickerGroupMessageType;
};

export function AnimatedStickerGroupMessageContent(
    props: AnimatedStickerGroupMessageContentProps
) {
    const messageContentRef = React.useRef<HTMLDivElement>(null);
    const { message: stickerGroupMessage } = props;
    const stickerMessageList = stickerGroupMessage.content;
    const fromMe = stickerGroupMessage.fromMe;

    console.log('@dongmt AnimatedStickerGroupMessageContent props: ', props);

    return (
        <div
            ref={messageContentRef}
            className={classNames(
                'sticker-group-message-content',
                '--animated',
                fromMe && '--me'
            )}
        >
            <TransitionGroup
                containerRef={messageContentRef}
                appear={props.isJustAdded}
                enter={true}
                exit={false}
                component={null}
            >
                {stickerMessageList.map((stickerMessage) => {
                    return (
                        <CSSTransition
                            key={stickerMessage.msgId}
                            classNames="sticker-message-item"
                            addEndListener={(node: any, done: any) => {
                                node.addEventListener(
                                    'transitionend',
                                    done,
                                    false
                                );
                            }}
                        >
                            <NormalStickerMessageContent
                                key={stickerMessage.msgId}
                                message={stickerMessage}
                            />
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        </div>
    );
}
