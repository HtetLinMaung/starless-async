import isAsyncFunction from "./utils/is-async-function";

export interface DynamicObject {
  [key: string]: any;
}

export const timeout = async (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration * 1000));

export const asyncEach = async (
  values: any[] | DynamicObject,
  cb: (value: any, key: number | string) => any
) => {
  if (Array.isArray(values)) {
    const promises: any[] = [];
    let i = 0;
    for (const value of values) {
      promises.push(cb(value, i));
      i++;
    }
    if (isAsyncFunction(cb)) {
      return await Promise.all(promises);
    }
    return promises;
  } else {
    const obj: any = {};
    for (const [key, value] of Object.entries(values)) {
      obj[key] = cb(value, key);
    }
    if (isAsyncFunction(cb)) {
      for (const [key, value] of Object.entries(obj)) {
        obj[key] = await value;
      }
    }
    return obj;
  }
};
