import { METHODS } from './constants';
import { HTTPMethod, TOptions } from './types';

export function queryStringify(data: { [key: string]: unknown }) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export class HTTPTransport {
  get: HTTPMethod = (
    url,
    options,
  ) => this.request(url, { ...options, method: METHODS.GET, timeout: 5000 });

  post: HTTPMethod = (
    url: string,
    options,
  ) => this.request(url, { ...options, method: METHODS.POST, timeout: 5000 });

  put: HTTPMethod = (
    url: string,
    options,
  ) => this.request(url, { ...options, method: METHODS.PUT, timeout: 5000 });

  delete: HTTPMethod = (
    url: string,
    options,
  ) => this.request(url, { ...options, method: METHODS.DELETE, timeout: 5000 });

  request = (url: string, options: TOptions) => {
    const {
      headers = {},
      method,
      data,
      timeout,
    } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('no method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      // eslint-disable-next-line func-names
      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        // @ts-ignore
        xhr.send(data);
      }
    });
  };
}

export function fetchWithRetry(url: string, options: { retries: number }) {
  const http = new HTTPTransport();
  let { retries } = options;
  const response = http.get(url, { ...options, method: METHODS.GET, timeout: 5000 });
  return response
    .catch((err) => {
      retries--;
      if (retries === 0) {
        throw new Error(err);
      }
      fetchWithRetry(url, options);
    });
}
