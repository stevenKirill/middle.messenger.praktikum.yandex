import isObjectLike from './isObjectLike';

function isEqual(object1: object, object2: object): boolean {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key as keyof typeof object1];
    const val2 = object2[key as keyof typeof object1];
    const areObjects = isObjectLike(val1) && isObjectLike(val2);
    if ((areObjects && !isEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false;
    }
  }
  return true;
}

export default isEqual;
