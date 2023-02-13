import { validateLogin } from './index';

describe('Test cases for validation', () => {
  it('test that login is not valid', () => {
    const str = validateLogin('k');
    expect(str).toBe('Длина логина от 3 до 20');
  });

  it('test that login is valid', () => {
    const str = validateLogin('kirill15');
    expect(str).toBe('');
  });
});
