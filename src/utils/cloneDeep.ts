export function cloneDeep<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const newArray: any[] = [];
    for (const item of obj) {
      newArray.push(cloneDeep(item));
    }
    return newArray as T;
  }

  if (typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = cloneDeep(obj[key]);
    }
    return newObj as T;
  }

  return obj;
}
