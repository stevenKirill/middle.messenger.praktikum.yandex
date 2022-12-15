import isArrayLike from './isArrayLike';
import isPrototype from './isPrototype';
import isArguments from './isArguments';
import getTag from './getTag';

function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value)
    && (Array.isArray(value) || typeof value === 'string' || typeof value.splice === 'function'
    || isArguments(value))) {
    return !value.length;
  }
  const tag = getTag(value);
  if (tag === '[object Map]' || tag === '[object Set]') {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !Object.keys(value).length;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

export default isEmpty;
