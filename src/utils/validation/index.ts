export const validateLogin = (text: string): string => {
  if (text.length < 3 || text.length > 20) {
    return 'Длина логина от 3 до 20';
  }
  return '';
};

export const validateEmail = () => {

};

export const validatePassword = () => {

};

export const validatePhone = () => {

};

export const validateMessage = () => {

};

export const validateFirstName = () => {

};

export const validateSecondName = () => {

};
