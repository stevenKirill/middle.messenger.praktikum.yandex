import isObjectLike from './isObjectLike';
import getTag from './getTag';

function isArguments(value) {
  return isObjectLike(value) && getTag(value) === '[object Arguments]';
}

export default isArguments;
