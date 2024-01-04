import { LoremIpsum } from 'lorem-ipsum';
import { v1 as uuidv1 } from 'uuid';

const textGenerator = new LoremIpsum({
    sentencesPerParagraph: {
        min: 4,
        max: 8,
    },
    wordsPerSentence: {
        min: 4,
        max: 16,
    },
});

const fromMeGenerator = () => Math.floor(Math.random() * 2);

export enum MessageTypes {
    Text = 1,
    Sticker = 2,
    StickerGroup = 3,
}

export type Sticker = {
    id: string;
    cateId: string;
    thumbUrl: string;
    spriteUrl: string;
};

export type StickerGroupMessageContent = StickerMessageType[];

type CommonMessageProps = {
    msgId: string;
    fromMe: number;
    senDttm: number;
};

export type TextMessageType = CommonMessageProps & {
    msgType: MessageTypes.Text;
    content: string;
};

export type StickerMessageType = CommonMessageProps & {
    msgType: MessageTypes.Sticker;
    content: Sticker;
};

export type StickerGroupMessageType = CommonMessageProps & {
    msgType: MessageTypes.StickerGroup;
    content: StickerGroupMessageContent;
};

export type MessageType =
    | TextMessageType
    | StickerMessageType
    | StickerGroupMessageType;

const StickerStore: Sticker[] = [
    {
        cateId: '111',
        id: '1',
        thumbUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46956&size=130',
        spriteUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46956&size=130',
    },
    {
        cateId: '111',
        id: '2',
        thumbUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46954&size=130',
        spriteUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46954&size=130',
    },
    {
        cateId: '111',
        id: '3',
        thumbUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46957&size=130',
        spriteUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46957&size=130',
    },
    {
        cateId: '111',
        id: '4',
        thumbUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46961&size=130',
        spriteUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46961&size=130',
    },
    {
        cateId: '111',
        id: '5',
        thumbUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46960&size=130',
        spriteUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46960&size=130',
    },
    {
        cateId: 'aaa',
        id: '1',
        thumbUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=17041&size=130',
        spriteUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=17041&size=130',
    },
    {
        cateId: 'aaa',
        id: '2',
        thumbUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=25840&size=130',
        spriteUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=25840&size=130',
    },
    {
        cateId: 'aaa',
        id: '3',
        thumbUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=25337&size=130',
        spriteUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=25337&size=130',
    },
    {
        cateId: 'aaa',
        id: '4',
        thumbUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=20089&size=130',
        spriteUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=20089&size=130',
    },
    {
        cateId: 'aaa',
        id: '5',
        thumbUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=20097&size=130',
        spriteUrl:
            'https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=20097&size=130',
    },
];
const stickerGenerator = () => {
    const stickerIndex = Math.floor(Math.random() * StickerStore.length);
    return StickerStore[stickerIndex];
};

const MAX_STICKER_PER_ROW = 3;
export class MessageRepository {
    static getInitialMessageList(listLength: number = 20): MessageType[] {
        const messageList: MessageType[] = [];
        for (let i = 0; i < listLength; i++) {
            if ((Math.floor(Math.random() * 100) + 1) % 3 === 0) {
                messageList.push(this.createTextMessage());
            } else {
                messageList.push(this.createStickerMessage());
            }
        }

        return messageList;
    }

    static createStickerMessage(): StickerMessageType {
        return {
            msgId: uuidv1(),
            msgType: MessageTypes.Sticker,
            fromMe: fromMeGenerator(),
            content: stickerGenerator(),
            senDttm: Date.now(),
        };
    }

    static createTextMessage(): TextMessageType {
        return {
            msgId: uuidv1(),
            msgType: MessageTypes.Text,
            fromMe: fromMeGenerator(),
            content: textGenerator.generateSentences(
                Math.floor(Math.random() * 10 + 1)
            ),
            senDttm: Date.now(),
        };
    }

    static groupMessageList(messageList: MessageType[]): MessageType[] {
        const groupedMessageList: MessageType[] = [];
        let groupedCount = 0;
        for (let i = 0; i < messageList.length; i += groupedCount + 1) {
            const messageI = messageList[i];
            groupedCount = 0;
            if (messageI.msgType === MessageTypes.Sticker) {
                let currentLastStickerMessage = messageI as StickerMessageType;

                const stickerGroupMessage: StickerGroupMessageType = {
                    msgId: currentLastStickerMessage.msgId,
                    msgType: MessageTypes.StickerGroup,
                    fromMe: currentLastStickerMessage.fromMe,
                    content: [currentLastStickerMessage],
                    senDttm: currentLastStickerMessage.senDttm,
                };
                groupedMessageList.push(stickerGroupMessage);
                for (let j = i + 1; j < messageList.length; j++) {
                    const messageJ = messageList[j];
                    if (
                        stickerGroupMessage.content.length <
                            MAX_STICKER_PER_ROW &&
                        currentLastStickerMessage.fromMe === messageJ.fromMe &&
                        currentLastStickerMessage.msgType === messageJ.msgType
                    ) {
                        currentLastStickerMessage = messageJ;
                        // stickerGroupMessage.msgId =
                        //     currentLastStickerMessage.msgId;
                        // stickerGroupMessage.senDttm = currentLastStickerMessage.senDttm;
                        stickerGroupMessage.content.push(messageJ);
                        groupedCount++;
                    } else {
                        break;
                    }
                }
            } else {
                groupedMessageList.push(messageI);
            }
        }

        return groupedMessageList;
    }
}
