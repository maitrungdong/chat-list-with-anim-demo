import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { separateItemPerRow } from '../../utils/seperate-item-per-row';
import type { StickerGroupMessageType } from '../../MessageRepository';

import StickerMessageContent from './StickerMessageContent';
import StickerGroupMessageRow from './StickerGroupMessageRow';
import StickerGroupMessageRowItem from './StickerGroupMessageRowItem';

type StickerGroupMessageContentWithNewAnimationProps = {
    isJustAdded?: boolean;
    message: StickerGroupMessageType;
};

export function StickerGroupMessageContentWithNewAnimation(
    props: StickerGroupMessageContentWithNewAnimationProps
) {
    const { message: stickerGroupMessage } = props;
    const stickerMessagesPerRow = separateItemPerRow(
        stickerGroupMessage.content
    );

    return (
        <div className="sticker-group-message-content">
            {stickerMessagesPerRow.map((stickerMessages_) => {
                const fromMe = stickerGroupMessage.fromMe;
                const rowKey = `sgm-row:${stickerMessages_[0].msgId}`;
                /** @issue We should optimize by using css! */
                const stickerMessages = fromMe
                    ? stickerMessages_
                    : stickerMessages_.slice().reverse();

                return (
                    <StickerGroupMessageRow key={rowKey}>
                        <TransitionGroup
                            component={null}
                            exit={false}
                            appear={props.isJustAdded}
                        >
                            {stickerMessages.map((stickerMessage) => {
                                const colKey = `sgm-row-item:${stickerMessage.msgId}`;
                                return (
                                    <StickerGroupMessageRowItem
                                        key={colKey}
                                        message={stickerMessage}
                                    >
                                        <StickerMessageContent
                                            message={stickerMessage}
                                        />
                                    </StickerGroupMessageRowItem>
                                );
                            })}
                        </TransitionGroup>
                    </StickerGroupMessageRow>
                );
            })}
        </div>
    );
}
