import React from 'react';
import { Flipper } from 'react-flip-toolkit';

import { separateItemPerRow } from '../../utils/seperate-item-per-row';

import StickerGroupMessageRow from './StickerGroupMessageRow';
import StickerGroupMessageRowItem from './StickerGroupMessageRowItem';
import StickerMessageContent from './StickerMessageContent';

import type {
    StickerGroupMessageType,
} from '../../MessageRepository';

type StickerGroupMessageContentProps = {
    message: StickerGroupMessageType;
};

const buildSGMFlipKey = (sgm: StickerGroupMessageType) => {
    return sgm?.content?.map((sm) => sm.msgId).join('#') ?? '';
};

function StickerGroupMessageContent(props: StickerGroupMessageContentProps) {
    const { message: stickerGroupMessage } = props;
    const stickerMessagesPerRow = separateItemPerRow(
        stickerGroupMessage.content
    );
    console.log('[mtd] StickerGroupMessageContent: ', stickerGroupMessage);

    return (
        <Flipper flipKey={buildSGMFlipKey(stickerGroupMessage)}>
            <div className="sticker-group-message-content">
                {stickerMessagesPerRow.map((stickerMessages_) => {
                    const fromMe = stickerGroupMessage.fromMe;
                    const rowKey = `sgm-row:${stickerMessages_[0].msgId}`;
                    const stickerMessages = fromMe
                        ? stickerMessages_
                        : stickerMessages_.slice().reverse();

                    return (
                        <StickerGroupMessageRow key={rowKey}>
                            {stickerMessages.map((stickerMessage) => {
                                const colKey = `sgm-row-item:${stickerMessage.msgId}`;
                                return (
                                    <StickerGroupMessageRowItem
                                        key={colKey}
                                        // className={`${
                                        //     stickerMessages.length >= 3
                                        //         ? '--small'
                                        //         : ''
                                        // }`}
                                        message={stickerMessage}
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
        </Flipper>
    );
}

export default StickerGroupMessageContent;
