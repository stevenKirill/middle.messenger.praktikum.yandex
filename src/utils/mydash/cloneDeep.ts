function cloneDeep<T extends object = object>(obj: T) {
  return (function cloneDeepInner(
    item: T,
  ): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    if (item === null || typeof item !== 'object') {
      return item;
    }
    if (item instanceof Date) {
      return new Date(item.valueOf());
    }
    if (item instanceof Array) {
      const copy = [];

      item.forEach((_, i) => (copy[i] = cloneDeepInner(item[i])));

      return copy;
    }
    if (item instanceof Set) {
      const copy = new Set();

      item.forEach((v) => copy.add(cloneDeepInner(v)));

      return copy;
    }
    if (item instanceof Map) {
      const copy = new Map();

      item.forEach((v, k) => copy.set(k, cloneDeepInner(v)));

      return copy;
    }
    if (item instanceof Object) {
      const copy: object = {};
      Object.getOwnPropertySymbols(item).forEach((s) => (copy[s] = cloneDeepInner(item[s])));
      Object.keys(item).forEach((k) => (copy[k] = cloneDeepInner(item[k])));
      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  }(obj));
}

export default cloneDeep;
