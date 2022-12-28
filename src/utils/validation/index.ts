export const validateLogin = (text: string): string => {
  if (text.length < 3 || text.length > 20) {
    return 'Длина логина от 3 до 20';
  }
  return '';
};

export const validateEmail = (text: string): string => {
  if (!/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(text)) {
    return 'Не корректный ввод email';
  }
  return '';
};

export const validatePassword = (text: string): string => {
  if (text.length < 8
    || text.length > 40
    || !/(.*[A-Z].*)/g.test(text)
    || !/(.*\W.*)/g.test(text)
  ) {
    return 'Пароль должен содержать хотя бы 1 заглавную букву и 1 цифру. От 8 до 40 символов';
  }
  return '';
};

export const validatePassword2 = (text: string, prevPass: string): string => {
  if (text.length < 8
    || text.length > 40
    || !/(.*[A-Z].*)/g.test(text)
    || !/(.*\W.*)/g.test(text)
  ) {
    return 'Пароль должен содержать хотя бы 1 заглавную букву и 1 цифру. От 8 до 40 символов';
  }
  if (text !== prevPass) {
    return 'Пароли должны совпадать';
  }
  return '';
};

export const validatePhone = (text: string): string => {
  if (text.length < 10 || text.length > 15) {
    return 'Номер от 10 до 15 символов';
  }
  return '';
};

export const validateFirstName = (text: string): string => {
  if (
    (/[a-zA-Z]/g.test(text)
    || /[\wа-я]+/ig.test(text)
    || /-/g.test(text))
    && text[0] === text[0].toUpperCase()
    && !/\s/g.test(text)
    && !/^[0-9!@#\\$%\\^\\&*\\)\\(+=._-]+$/g.test(text)
  ) {
    return '';
  }
  return 'Ошибка - допустимо латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)';
};

export const validateSecondName = (text: string): string => {
  console.log(text);
  return '';
};

export const validateMessage = (text: string): string => {
  if (text === '') {
    return 'Сообщение не может быть пустым';
  }
  return '';
};
