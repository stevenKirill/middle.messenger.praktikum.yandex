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
