import type { InjectionKey, Ref } from 'vue'
import type { useNamespace } from '../../hooks'

export type TooltipContext = {
  onClose: () => void
  onDelayOpen: () => void
  onOpen: () => void
  contentId: Ref<string>
  triggerRef: Ref<HTMLElement | null>
  ns: ReturnType<typeof useNamespace>
}

export type TooltipContentContext = {
  arrowRef: Ref<HTMLElement | null>
}

export const tooltipRootKey: InjectionKey<TooltipContext> =
  Symbol('tooltip')

export const tooltipContentKey: InjectionKey<TooltipContentContext> =
  Symbol('tooltipContent')

export const TOOLTIP_OPEN = 'tooltip_.open'
