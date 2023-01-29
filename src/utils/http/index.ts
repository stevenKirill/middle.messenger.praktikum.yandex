import METHODS, { BASE_URL } from './constants';
import { HTTPMethod, TData, TOptions } from './types';

export function queryStringify(data: { [key: string]: unknown }) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

class HTTPTransport {
  baseUrl: string = '';

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get: HTTPMethod = (
    url,
    options,
  ) => this.request(url, { ...options, method: METHODS.GET, timeout: 5000 });

  post: HTTPMethod = (
    url,
    options,
  ) => this.request(url, { ...options, method: METHODS.POST, timeout: 5000 });

  put: HTTPMethod = (
    url,
    options,
  ) => this.request(url, { ...options, method: METHODS.PUT, timeout: 5000 });

  delete: HTTPMethod = (
    url,
    options,
  ) => this.request(url, { ...options, method: METHODS.DELETE, timeout: 5000 });

  request = <T>(url: string, options: TOptions): Promise<T> => {
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
          ? `${this.baseUrl}${url}${queryStringify(data as TData)}`
          : `${this.baseUrl}${url}`,
      );

      xhr.withCredentials = true;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        if (xhr.status === 200) {
          let res;
          try {
            res = JSON.parse(xhr.response);
          } catch (error) {
            res = xhr.response;
          }
          resolve(res);
        } else {
          reject(JSON.parse(xhr.response));
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout as number;
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

export const appHTTP = new HTTPTransport(BASE_URL);

export function fetchWithRetry(url: string, options: { retries: number }) {
  const http = new HTTPTransport(BASE_URL);
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
