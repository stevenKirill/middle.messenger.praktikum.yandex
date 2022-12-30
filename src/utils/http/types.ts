import { METHODS } from './constants';

export type THeaders = {
  [key: string]: string;
};

export type TData = {
  [key: string]: unknown;
};

export type TOptions = {
  headers?: THeaders;
  method: METHODS;
  data?: TData;
  timeout: number
};

export type HTTPMethod = (url: string, options?: TOptions) => Promise<unknown>;
