import { isString } from './obj'

class FloatingEditorError extends Error {
  constructor(m: string) {
    super(m)
    this.name = 'FloatingEditorError'
  }
}

export function throwError(scope: string, m: string): never {
  throw new FloatingEditorError(`[${scope}] ${m}`)
}

export function debugWarn(err: Error): void
export function debugWarn(scope: string, message: string): void
export function debugWarn(scope: string | Error, message?: string): void {
  if (process.env.NODE_ENV !== 'production') {
    const error: Error|string = isString(scope)
      ? new FloatingEditorError(`[${scope}] ${message}`)
      : scope
    // eslint-disable-next-line no-console
    console.warn(error)
  }
}
