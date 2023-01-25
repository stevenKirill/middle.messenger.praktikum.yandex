import METHODS from './constants';

export type THeaders = {
  [key: string]: string;
};

export type TData = {
  [key: string]: unknown;
};

export type TOptions = {
  headers?: THeaders;
  method?: METHODS;
  data?: TData | string | FormData;
  timeout?: number
};

export type HTTPMethod = <T>(url: string, options?: TOptions) => Promise<T>;
