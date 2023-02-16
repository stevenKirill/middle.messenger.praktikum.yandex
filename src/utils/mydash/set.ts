/* eslint-disable @typescript-eslint/no-explicit-any */
import merge, { TObject } from './merge';

function set(
  object: TObject | unknown,
  path: string,
  value: unknown,
): TObject | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }
  const result = path.split('.').reduceRight<TObject>((acc, key) => ({
    [key]: acc,
  }), value as any);
  return merge(object as TObject, result);
}

export default set;
