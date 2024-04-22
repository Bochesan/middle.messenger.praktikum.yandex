type Indexed<T = unknown> = {
  [key in string]: T;
};
function isEqual(a: Indexed, b: Indexed): boolean {
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (a === null || b === null) return false;
  for (const key in a) {
    if (Object.prototype.hasOwnProperty.call(a, key)) {
      if (Object.prototype.hasOwnProperty.call(b, key)) {
        if (typeof a[key] === 'object') {
          if (!isEqual(a[key] as Indexed, b[key] as Indexed)) return false;
        } else if (a[key] !== b[key]) return false;
      } else {
        return false;
      }
    }
  }
  return true;
}

export default isEqual;
