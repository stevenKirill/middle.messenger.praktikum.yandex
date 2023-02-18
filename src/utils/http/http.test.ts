import { expect } from 'chai';
import { HTTPTransport } from './index';

type TStatus = {
  status: number;
};

describe('Store tests', () => {
  const http = new HTTPTransport('api/v1');

  it('should be correct base url', () => {
    expect(http.baseUrl).to.be.equal('api/v1');
  });

  it('should call get method', async () => {
    http.get<TStatus>('api/v1/users', {}).then((res) => {
      expect(res.status).to.be.equal(200);
    });
  });
});
