import React from 'react';

import { separateItemPerRow } from '../../utils/seperate-item-per-row';

import StickerGroupMessageRow from './StickerGroupMessageRow';
import StickerGroupMessageRowItem from './StickerGroupMessageRowItem';
import StickerMessageContent from './StickerMessageContent';

type StickerGroupMessageContentProps = {
    message: any;
};

function StickerGroupMessageContent(props: StickerGroupMessageContentProps) {
    const { message: stickerGroupMessage } = props;
    const stickerMessageList = stickerGroupMessage.content;
    const stickerMessagesPerRow = separateItemPerRow(stickerMessageList);

    return (
        <div className="sticker-group-message-content">
            {stickerMessagesPerRow.map((stickerMessages) => {
                return (
                    <StickerGroupMessageRow
                        key={`sgm-row:${stickerMessages
                            .map((msg: any) => msg.msgId)
                            .join('#')}`}
                    >
                        {stickerMessages.map((stickerMessage: any) => {
                            return (
                                <StickerGroupMessageRowItem
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
