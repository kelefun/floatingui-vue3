/**
 * copy from vuejs/core/shared
 * @link https://github.com/vuejs/core/blob/main/packages/shared/src/index.ts
 */
 export const isObject = (val: unknown) => val !== null && typeof val === 'object';

const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (
    val: object,
    key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key)
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'