// Handle:
// * null
// * undefined
// * boolean
// * number
// * string
// * symbol
// * function
function cloneDeep<T extends object = object>(obj: T) {
  return (function _cloneDeep(
    item: T,
  ): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    if (item === null || typeof item !== 'object') {
      return item;
    }

    // Handle:
    // * Date
    if (item instanceof Date) {
      return new Date(item.valueOf());
    }

    // Handle:
    // * Array
    if (item instanceof Array) {
      const copy = [];

      item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

      return copy;
    }

    // Handle:
    // * Set
    if (item instanceof Set) {
      const copy = new Set();

      item.forEach((v) => copy.add(_cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Map
    if (item instanceof Map) {
      const copy = new Map();

      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Object
    if (item instanceof Object) {
      const copy: object = {};

      // Handle:
      // * Object.symbol
      Object.getOwnPropertySymbols(item).forEach((s) => (copy[s] = _cloneDeep(item[s])));

      // Handle:
      // * Object.name (other)
      Object.keys(item).forEach((k) => (copy[k] = _cloneDeep(item[k])));

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  }(obj));
}

export default cloneDeep;
