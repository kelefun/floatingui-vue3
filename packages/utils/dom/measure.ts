import type { ComponentPublicInstance } from 'vue'
import { isElement } from '../obj'

export type Measurable = {
    getBoundingClientRect: () => DOMRect
}

export const unwrapMeasurableEl = (
    $el: Measurable | null | ComponentPublicInstance
  ) => {
    if (!isClient) return null
    let el: HTMLElement | null = null
    if (!$el) return null
  
    if ('getBoundingClientRect' in $el || isElement($el)) {
      el = $el as HTMLElement
    } else {
      // refs can be Vue component
      el = ($el as any as ComponentPublicInstance).$el
    }
    return el
  }

export const isClient = typeof window !== "undefined";
