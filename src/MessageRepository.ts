import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    min: 4,
    max: 8,
  },
  wordsPerSentence: {
    min: 4,
    max: 16,
  },
});

export enum MessageTypes {
  Text = 1,
  Sticker = 2,
  StickerGroup = 3,
}

const TextMessageListData = [
  {
    msgId: "1",
    msgType: MessageTypes.Text,
    fromMe: 0,
    content: lorem.generateSentences(2),
  },
  {
    msgId: "2",
    msgType: MessageTypes.Text,
    fromMe: 1,
    content: lorem.generateSentences(4),
  },
  {
    msgId: "3",
    msgType: MessageTypes.Text,
    fromMe: 1,
    content: lorem.generateSentences(3),
  },
  {
    msgId: "4",
    msgType: MessageTypes.Text,
    fromMe: 0,
    content: lorem.generateSentences(1),
  },
  {
    msgId: "5",
    msgType: MessageTypes.Text,
    fromMe: 1,
    content: lorem.generateSentences(3),
  },
  {
    msgId: "6",
    msgType: MessageTypes.Text,
    fromMe: 0,
    content: lorem.generateSentences(6),
  },
  {
    msgId: "7",
    msgType: MessageTypes.Text,
    fromMe: 1,
    content: lorem.generateSentences(2),
  },
  {
    msgId: "8",
    msgType: MessageTypes.Text,
    fromMe: 0,
    content: lorem.generateSentences(5),
  },
  {
    msgId: "9",
    msgType: MessageTypes.Text,
    fromMe: 0,
    content: lorem.generateSentences(5),
  },
];

const StickerMessageListData = [
  {
    msgId: "10",
    msgType: MessageTypes.Sticker,
    fromMe: 1,
    content: {
      cateId: "111",
      id: "1",
      thumbUrl:
        "https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46956&size=130",
      spriteUrl:
        "https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46956&size=130",
    },
  },
  {
    msgId: "11",
    msgType: MessageTypes.Sticker,
    fromMe: 0,
    content: {
      cateId: "111",
      id: "2",
      thumbUrl:
        "https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46954&size=130",
      spriteUrl:
        "https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46954&size=130",
    },
  },
  {
    msgId: "12",
    msgType: MessageTypes.Sticker,
    fromMe: 0,
    content: {
      cateId: "111",
      id: "3",
      thumbUrl:
        "https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46957&size=130",
      spriteUrl:
        "https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46957&size=130",
    },
  },
  {
    msgId: "13",
    msgType: MessageTypes.Sticker,
    fromMe: 1,
    content: {
      cateId: "111",
      id: "4",
      thumbUrl:
        "https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46961&size=130",
      spriteUrl:
        "https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46961&size=130",
    },
  },
  {
    msgId: "14",
    msgType: MessageTypes.Sticker,
    fromMe: 1,
    content: {
      cateId: "111",
      id: "5",
      thumbUrl:
        "https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46960&size=130",
      spriteUrl:
        "https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46960&size=130",
    },
  },
];

const MessageListData = [...TextMessageListData, ...StickerMessageListData];
const MAX_STICKER_PER_ROW = 1;

export class MessageRepository {
  static getInitialMessageList() {
    return MessageListData;
  }
  static createStickerMessage() {
    const randomStickerMessage =
      StickerMessageListData[
        Math.floor(Math.random() * StickerMessageListData.length)
      ];
    return {
      ...randomStickerMessage,
      msgId: Date.now(),
    };
  }

  static createTextMessage() {
    return {
      msgId: Date.now(),
      msgType: MessageTypes.Text,
      fromMe: Math.floor(Math.random() * 2),
      content: lorem.generateSentences(Math.floor(Math.random() * 10 + 1)),
    };
  }

  static groupMessageList(messageList: any) {
    const groupedMessageList: any[] = [];
    let groupedCount = 0;
    for (let i = 0; i < messageList.length; i += groupedCount + 1) {
      const messageI = messageList[i];
      groupedCount = 0;
      if (messageI.msgType === MessageTypes.Sticker) {
        let currentLastStickerMessage = messageI;
        const stickerGroupMessage = {
          msgId: messageI.msgId,
          msgType: MessageTypes.StickerGroup,
          fromMe: messageI.fromMe,
          content: [messageI],
        };
        groupedMessageList.push(stickerGroupMessage);
        for (let j = i + 1; j < messageList.length; j++) {
          const messageJ = messageList[j];
          if (
            stickerGroupMessage.content.length < MAX_STICKER_PER_ROW &&
            currentLastStickerMessage.fromMe === messageJ.fromMe &&
            currentLastStickerMessage.msgType === messageJ.msgType
          ) {
            currentLastStickerMessage = messageJ;
            stickerGroupMessage.msgId = currentLastStickerMessage.msgId;
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
