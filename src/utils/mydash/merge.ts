export type TObject<T = unknown> = {
  [key in string]: T;
};

function merge(lhs: TObject = {}, rhs: TObject = {}) {
  Object.keys(rhs).forEach((key) => {
    if (rhs[key] && typeof rhs[key] === 'object' && rhs[key] !== null) {
      merge(rhs[key] as TObject, lhs[key] as TObject);
    } else {
      Object.assign(lhs, { [key]: rhs[key] });
    }
  });
  return lhs;
}

export default merge;
