import React from 'react';

import { separateItemPerRow } from '../../utils/seperate-item-per-row';

import StickerGroupMessageRow from './StickerGroupMessageRow';
import StickerGroupMessageRowItem from './StickerGroupMessageRowItem';
import StickerMessageContent from './StickerMessageContent';
import type {
    StickerGroupMessageType,
    StickerMessageType,
} from '../../MessageRepository';

type StickerGroupMessageContentProps = {
    message: StickerGroupMessageType;
};

function StickerGroupMessageContent(props: StickerGroupMessageContentProps) {
    const { message: stickerGroupMessage } = props;
    const stickerMessageList = stickerGroupMessage.content;
    const stickerMessagesPerRow = separateItemPerRow(stickerMessageList);

    return (
        <div className="sticker-group-message-content">
            {stickerMessagesPerRow.map((stickerMessages_) => {
                const fromMe = stickerGroupMessage.fromMe;
                const rowKey = stickerMessages_[0].msgId;
                const stickerMessages: StickerMessageType[] = fromMe
                    ? stickerMessages_
                    : stickerMessages_.slice().reverse();
                return (
                    <StickerGroupMessageRow key={`sgm-row:${rowKey}`}>
                        {stickerMessages.map((stickerMessage) => {
                            return (
                                <StickerGroupMessageRowItem
                                    className={`${
                                        stickerMessages.length >= 3
                                            ? '--small'
                                            : ''
                                    }`}
                                    key={`sgm-row-item:${stickerMessage.msgId}`}
                                >
                                    <StickerMessageContent
                                        message={stickerMessage}
                                    />
                                </StickerGroupMessageRowItem>
                            );
                        })}
                    </StickerGroupMessageRow>
                );
            })}
        </div>
    );
}

export default StickerGroupMessageContent;
