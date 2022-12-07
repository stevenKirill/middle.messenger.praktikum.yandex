function last(list) {
  if (!Array.isArray(list)) return undefined;
  return list[list.length - 1] || undefined;
}
export default last;
