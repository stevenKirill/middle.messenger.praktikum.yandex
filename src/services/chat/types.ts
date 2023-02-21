export type TSocketData = {
  chatId: string;
  token: string;
};

export type TChatIdData = {
  chatId: number;
};

export type TSendMessagePayload = {
  chatId: number;
  messageText: string;
};

export type TLoadMessagePayload = {
  chatId: number;
  offset: number;
};

export type TChatMessageItem = {
  content: string;
  type: string;
  id: string;
  user_id: string;
  time: string;
} & { formatTime: string };

export type ObjectWithMessages = Record<string, TChatMessageItem[]>;
