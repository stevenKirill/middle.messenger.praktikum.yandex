export type TCreateChatRequest = {
  title: string;
};

type QueryChats = 'offset' | 'limit' | 'title';

export type TGetChatRequest = {
  [key in QueryChats]: string;
};

export type TGetChatResponse = {
  id: number;
  title: string;
  avatar: string;
  unread_count: string;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    },
    time: string;
    content: string;
  }
};

export type TDeleteChatRequest = {
  chatId: number;
};

export type TDeleteChatResponse = {
  userId: number;
  result: {
    id: number
    title: string;
    avatar: string;
  }
};

export type TInviteUserRequest = {
  users: number[];
  chatId: number;
};
