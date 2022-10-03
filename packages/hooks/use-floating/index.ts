import { isRef, onMounted, ref, unref, watchEffect } from 'vue'
import { isClient, unrefElement } from '@vueuse/core'
import { isNil } from '../../utils/obj/lodash'
import { arrow as arrowCore, computePosition } from '@floating-ui/dom'
import { buildProps } from '../../utils/vue/props'
import { keysOf } from '../../utils/obj'

import type { Ref, ToRefs } from 'vue'
import type {
  MiddlewareData,
  Middleware,
  Placement,
  SideObject,
  Strategy,
  VirtualElement,
} from '@floating-ui/dom'

export const useFloatingProps = buildProps({} as const)

export type UseFloatingProps = ToRefs<{
  middleware: Array<Middleware>
  placement: Placement
  strategy: Strategy
}>

type ElementRef = Parameters<typeof unrefElement>['0']

const unrefReference = (
  elRef: ElementRef | Ref<VirtualElement | undefined>
) => {
  if (!isClient) return
  if (!elRef) return elRef
  const unrefEl = unrefElement(elRef as ElementRef)
  if (unrefEl) return unrefEl
  return isRef(elRef) ? unrefEl : (elRef as VirtualElement)
}

export const getPositionDataWithUnit = <T extends Record<string, number>>(
  record: T | undefined,
  key: keyof T
) => {
  const value = record?.[key]
  return isNil(value) ? '' : `${value}px`
}

export const useFloating = ({
  middleware,
  placement,
  strategy,
}: UseFloatingProps) => {
  const referenceRef = ref<HTMLElement | VirtualElement>()
  const contentRef = ref<HTMLElement>()
  const x = ref<number>()
  const y = ref<number>()
  const middlewareData = ref<MiddlewareData>({})

  const states = {
    x,
    y,
    placement,
    strategy,
    middlewareData,
  } as const

  const update = async () => {
    if (!isClient) return
    const referenceEl = unrefReference(referenceRef)
    const contentEl = unrefReference(contentRef)
    if (!referenceEl || !contentEl) return
    //@ts-ignore
    const data = await computePosition(referenceEl, contentEl, {
      placement: unref(placement),
      strategy: unref(strategy),
      middleware: unref(middleware),
    })

    keysOf(states).forEach((key) => {
      states[key].value = data[key]
    })
  }

  onMounted(() => {
    watchEffect(() => {
      update()
    })
  })

  return {
    ...states,
    update,
    referenceRef,
    contentRef,
  }
}

export type ArrowMiddlewareProps = {
  arrowRef: Ref<HTMLElement | null | undefined>
  padding?: number | SideObject
}

export const arrowMiddleware = ({
  arrowRef,
  padding,
}: ArrowMiddlewareProps): Middleware => {
  return {
    name: 'arrow',
    options: {
      element: arrowRef,
      padding,
    },

    fn(args) {
      const arrowEl = unref(arrowRef)
      if (!arrowEl) return {}

      return arrowCore({
        element: arrowEl,
        padding,
      }).fn(args)
    },
  }
}
