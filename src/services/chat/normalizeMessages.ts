import { TChatMessageItem } from './types';

export const normalizeMessages = (
  messages: TChatMessageItem[],
) => messages.sort((a, b) => new Date(a.time) - new Date(b.time)).map((message) => {
  const date = new Date(message.time);
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  let resHours = '';
  let resMinutes = '';
  if (Number(hours) < 10) {
    resHours = `0${hours}`;
  } else {
    resHours = hours;
  }
  if (Number(minutes) < 10) {
    resMinutes = `0${minutes}`;
  } else {
    resMinutes = minutes;
  }
  return {
    ...message,
    time: `${resHours}:${resMinutes}`,
  };
});
