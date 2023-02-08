
import Block from './block/Block';

export type Keys<T extends Record<string, unknown>> = keyof T;
export type Values<T extends Record<string, unknown>> = T[Keys<T>];

export interface BlockClass<Props = unknown> {
  new(props: Props): Block;
  name: string;
  componentName: string;
}
