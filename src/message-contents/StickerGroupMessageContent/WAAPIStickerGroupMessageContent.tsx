import React from 'react';
import classNames from 'classnames';
import type { StickerGroupMessageType } from '@src/MessageRepository';
import { NormalStickerMessageContent } from './NormalStickerMessageContent';

const BlockName = 'sticker-group-message-content';
const ClassNames = {
    BlockName,
    Elements: {},
    Modifiers: {
        WAAPI: '--waapi',
    },
};

export type WAAPIStickerGroupMessageContentProps = {
    isJustAdded?: boolean;
    message: StickerGroupMessageType;
};

export class WAAPIStickerGroupMessageContent extends React.Component<WAAPIStickerGroupMessageContentProps> {
    messageContentRef: React.RefObject<HTMLDivElement>;
    childrenMap: Map<
        string,
        {
            id: string;
            element: HTMLElement;
        }
    >;

    constructor(props: WAAPIStickerGroupMessageContentProps) {
        super(props);

        this.messageContentRef = React.createRef<HTMLDivElement>();
        this.childrenMap = new Map();
    }

    componentDidMount(): void {
        console.log(
            '@dongmt WAAPIStickerGroupMessageContent componentDidMount'
        );
        console.log('@dongmt this.childrenMap: ', this.childrenMap);
        const children = Array.from(this.childrenMap.values());

        /** First mounted items: */
        for (const child of children) {
            const player = child.element.animate(
                [
                    {
                        transform: 'translateY(100%)',
                        opacity: 0,
                    },
                    {
                        transform: 'translateY(0)',
                        opacity: 1,
                    },
                ],
                {
                    duration: 200,
                    easing: 'ease',
                }
            );
        }
    }

    getSnapshotBeforeUpdate(
        prevProps: Readonly<WAAPIStickerGroupMessageContentProps>,
        prevState: Readonly<{}>
    ) {
        console.log(
            '@dongmt WAAPIStickerGroupMessageContent getSnapshotBeforeUpdate'
        );
        const children = Array.from(this.childrenMap.values());

        /** Get snapshot of items before updating... */
        const prevChildRects: { [idx: number | string]: any } = {};
        for (const child of children) {
            prevChildRects[child.id] = child.element.getBoundingClientRect();
        }
        return {
            prevChildRects,
        };
    }

    componentDidUpdate(
        prevProps: Readonly<WAAPIStickerGroupMessageContentProps>,
        prevState: Readonly<{}>,
        snapshot?: any
    ): void {
        console.log(
            '@dongmt WAAPIStickerGroupMessageContent componentDidUpdate'
        );

        const children = Array.from(this.childrenMap.values());
        for (const child of children) {
            const prevRect = snapshot.prevChildRects[child.id];
            /** Entered. */
            if (prevRect) {
                const rect = child.element.getBoundingClientRect();
                let dx = prevRect.left - rect.left;
                const player = child.element.animate(
                    [
                        {
                            transform: `translateX(${dx}px)`,
                        },
                        {
                            transform: 'translateX(0)',
                        },
                    ],
                    {
                        duration: 200,
                        easing: 'ease',
                    }
                );
            } else {
                /** Not enter yet! */
                const player = child.element.animate(
                    [
                        {
                            transform: 'translateY(100%)',
                            opacity: 0,
                        },
                        {
                            transform: 'translateY(0)',
                            opacity: 1,
                        },
                    ],
                    {
                        duration: 200,
                        easing: 'ease',
                    }
                );
            }
        }
    }

    render() {
        const { message: stickerGroupMessage } = this.props;
        const stickerMessageList = stickerGroupMessage.content;
        const fromMe = stickerGroupMessage.fromMe;

        return (
            <div
                ref={this.messageContentRef}
                id={stickerGroupMessage.msgId}
                className={classNames(
                    ClassNames.BlockName,
                    ClassNames.Modifiers.WAAPI,
                    fromMe && '--me'
                )}
            >
                {stickerMessageList.map((stickerMessage) => {
                    return (
                        <NormalStickerMessageContent
                            ref={(ref) => {
                                if (ref) {
                                    this.childrenMap.set(stickerMessage.msgId, {
                                        id: stickerMessage.msgId,
                                        element: ref,
                                    });
                                } else {
                                    this.childrenMap.delete(
                                        stickerMessage.msgId
                                    );
                                }
                            }}
                            key={stickerMessage.msgId}
                            message={stickerMessage}
                        />
                    );
                })}
            </div>
        );
    }
}
