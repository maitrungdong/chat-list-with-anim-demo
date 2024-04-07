import React from 'react';
import { separateItemPerRow } from '../../utils/seperate-item-per-row';
import type { StickerGroupMessageType } from '../../MessageRepository';

import StickerMessageContent from './StickerMessageContent';
import StickerGroupMessageRow from './StickerGroupMessageRow';
import StickerGroupMessageRowItem from './StickerGroupMessageRowItem';

type StaticStickerGroupMessageContentProps = {
    isJustAdded?: boolean;
    message: StickerGroupMessageType;
};

export class StaticStickerGroupMessageContent extends React.Component<StaticStickerGroupMessageContentProps> {
    stickerGroupMessageContentRef: React.RefObject<HTMLDivElement>;

    constructor(props: StaticStickerGroupMessageContentProps) {
        super(props);
        this.state = {};
        this.stickerGroupMessageContentRef = React.createRef<HTMLDivElement>();
    }

    getSnapshotBeforeUpdate(
        prevProps: Readonly<StaticStickerGroupMessageContentProps>,
        prevState: Readonly<{}>
    ) {
        if (
            prevProps.isJustAdded &&
            prevProps.message.content.length !==
                this.props.message.content.length
        ) {
            //TODO: get element positions of elements before update and return them!
        }
    }

    componentDidUpdate(
        prevProps: Readonly<StaticStickerGroupMessageContentProps>,
        prevState: Readonly<{}>,
        snapshot?: any
    ) {
        if (
            prevProps.isJustAdded &&
            prevProps.message.content.length !==
                this.props.message.content.length
        ) {
        }
    }

    render() {
        const { message: stickerGroupMessage } = this.props;
        const stickerMessagesPerRow = separateItemPerRow(
            stickerGroupMessage.content
        );

        return (
            <div
                ref={this.stickerGroupMessageContentRef}
                className="sticker-group-message-content"
            >
                {stickerMessagesPerRow.map((stickerMessages_) => {
                    const fromMe = stickerGroupMessage.fromMe;
                    const rowKey = `sgm-row:${stickerMessages_[0].msgId}`;
                    /** @issue We should optimize by using css! */
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
        );
    }
}

// export function StaticStickerGroupMessageContent(
//     props: StaticStickerGroupMessageContentProps
// ) {
//     const { message: stickerGroupMessage } = props;
//     const stickerGroupMessageContentRef = React.useRef<HTMLDivElement>(null);
//     const stickerMessagesPerRow = separateItemPerRow(
//         stickerGroupMessage.content
//     );

//     return (
//         <div
//             ref={stickerGroupMessageContentRef}
//             className="sticker-group-message-content"
//         >
//             {stickerMessagesPerRow.map((stickerMessages_) => {
//                 const fromMe = stickerGroupMessage.fromMe;
//                 const rowKey = `sgm-row:${stickerMessages_[0].msgId}`;
//                 /** @issue We should optimize by using css! */
//                 const stickerMessages = fromMe
//                     ? stickerMessages_
//                     : stickerMessages_.slice().reverse();

//                 return (
//                     <StickerGroupMessageRow key={rowKey}>
//                         {stickerMessages.map((stickerMessage) => {
//                             const colKey = `sgm-row-item:${stickerMessage.msgId}`;
//                             return (
//                                 <StickerGroupMessageRowItem
//                                     key={colKey}
//                                     message={stickerMessage}
//                                 >
//                                     <StickerMessageContent
//                                         message={stickerMessage}
//                                     />
//                                 </StickerGroupMessageRowItem>
//                             );
//                         })}
//                     </StickerGroupMessageRow>
//                 );
//             })}
//         </div>
//     );
// }
