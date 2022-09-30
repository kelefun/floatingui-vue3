import { buildProps, definePropType } from "@fv/utils"

import type { ExtractPropTypes } from 'vue'

const EventHandler = {
  type: definePropType<(e: Event) => boolean | void>(Function),
} as const

export const tooltipTriggerProps = buildProps({
  onBlur: EventHandler,
  onClick: EventHandler,
  onFocus: EventHandler,
  onMouseDown: EventHandler,
  onMouseEnter: EventHandler,
  onMouseLeave: EventHandler,
} as const)

export type TooltipTriggerProps = ExtractPropTypes<
  typeof tooltipTriggerProps
>
