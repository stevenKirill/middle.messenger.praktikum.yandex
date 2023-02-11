import { ObjectWithMessages, TChatMessageItem } from './types';

export const transformTime = (dateInput: string): string => {
  const date = new Date(dateInput);
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  const resHours = Number(hours) < 10 ? `0${hours}` : hours;
  const resMinutes = Number(minutes) < 10 ? `0${minutes}` : minutes;
  return `${resHours}:${resMinutes}`;
};

export const costructDate = (dateInput: string): string => {
  const dateObject = new Date(dateInput);
  const date = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const resultDate = date < 10 ? `0${date}` : date;
  const resultMonth = month < 10 ? `0${month}` : month;
  const resultString = `${year}-${resultMonth}-${resultDate}`;
  return resultString;
};

const createObject = (messages: TChatMessageItem[]) => {
  const gropedMessages = messages.reduce((acc, curr) => {
    const date = costructDate(curr.time);
    return { ...acc, [date]: [] };
  }, {} as ObjectWithMessages);
  return gropedMessages;
};

const groupObjects = (
  object: ObjectWithMessages,
  messages: TChatMessageItem[],
) => {
  messages.forEach((message) => {
    const date = costructDate(message.time);
    if (date) {
      object[date].push({
        ...message,
        formatTime: transformTime(message.time),
      });
    }
  });
};

const sortObjects = (objects: ObjectWithMessages) => {
  Object.entries(objects).forEach(([, mes]) => {
    mes.sort((a, b) => {
      const firstDate = new Date(a.time).getTime();
      const secondDate = new Date(b.time).getTime();
      return firstDate - secondDate;
    });
  });
};

export const convertMessagesToObject = (messages: TChatMessageItem[]) => {
  const gropedMessages = createObject(messages);
  groupObjects(gropedMessages, messages);
  sortObjects(gropedMessages);
  return gropedMessages;
};
