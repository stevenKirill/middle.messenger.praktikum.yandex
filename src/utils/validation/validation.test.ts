import { expect } from 'chai';
import { validateLogin } from './index';

describe('validation', () => {
  context('login', () => {
    it('should return error', () => {
      const validated = validateLogin('k');
      expect(validated).to.eqls('Длина логина от 3 до 20');
    });

    it('should be valid', () => {
      const validated = validateLogin('kirill1');
      expect(validated).to.eqls('');
    });
  });
});
