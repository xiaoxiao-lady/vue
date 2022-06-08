export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
export function isFunction(obj) {
  return typeof obj === 'function';
}
export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  });
}
export function hasOwn(obj, key) {
  return obj.hasOwnProperty(key);
}
/*判断当前浏览器是否支持__proto__这个非标准属性*/
export const hasProto = '__proto__' in {}
