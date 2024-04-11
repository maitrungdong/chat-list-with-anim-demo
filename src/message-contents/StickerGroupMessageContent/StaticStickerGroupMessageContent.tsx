import React from 'react';
import classNames from 'classnames';
import type { StickerGroupMessageType } from '@src/MessageRepository';
import { NormalStickerMessageContent } from './NormalStickerMessageContent';

export type StaticStickerGroupMessageContentProps = {
    isJustAdded?: boolean;
    message: StickerGroupMessageType;
};

export function StaticStickerGroupMessageContent(
    props: StaticStickerGroupMessageContentProps
) {
    const { message: stickerGroupMessage } = props;
    const stickerMessageList = stickerGroupMessage.content;
    const fromMe = stickerGroupMessage.fromMe;

    return (
        <div
            className={classNames(
                'sticker-group-message-content',
                '--static',
                fromMe && '--me'
            )}
        >
            {stickerMessageList.map((stickerMessage) => {
                return (
                    <NormalStickerMessageContent
                        key={stickerMessage.msgId}
                        message={stickerMessage}
                    />
                );
            })}
        </div>
    );
}
