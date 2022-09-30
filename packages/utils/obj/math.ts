/**
 * Generate random number in range [0, 1000]
 * Maybe replace with [uuid](https://www.npmjs.com/package/uuid)
 */
 export const generateId = (): number => Math.floor(Math.random() * 10000)
