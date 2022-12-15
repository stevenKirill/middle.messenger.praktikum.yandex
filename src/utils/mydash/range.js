function range(start, end, step, fromRight) {
  let actualEnd = end;
  let actualStart = start;
  let actualStep = step;
  if (actualEnd === undefined) {
    actualEnd = actualStart;
    actualStart = 0;
  }
  actualStep = actualStep === undefined ? (actualStart < actualEnd ? 1 : -1) : actualStep;
  let index = -1;
  let length = Math.max(Math.ceil((actualEnd - actualStart) / (actualStep || 1)), 0);
  const result = new Array(length);

  while (length--) {
    result[fromRight ? length : ++index] = actualStart;
    actualStart += actualStep;
  }
  return result;
}

export default range;
