<template>
  <div ref="contentRef" :style="contentStyle" data-tooltip--root>
    <div v-if="!nowrap" :data-side="staticSide" :class="contentClass">
      <slot :content-style="contentStyle" :content-class="contentClass" />
    </div>
    <slot name="arrow" :style="arrowStyle" :side="staticSide" />

  </div>

</template>

<script setup lang="ts">
import { computed, inject, onMounted, provide, ref, unref, watch } from 'vue'
import { autoPlacement, offset } from '@floating-ui/dom'
import { tooltipContentKey, tooltipRootKey } from '@fv/utils'
import {
  arrowMiddleware,
  useFloating,
  useNamespace,
  useZIndex,
} from '@fv/hooks'
// import VisuallyHidden from '../../visual-hidden'
import { tooltipContentProps } from './content'
import { tooltipCommonProps } from './common'

import type { CSSProperties } from 'vue'
import type { Middleware } from '@floating-ui/dom'

const props = defineProps({ ...tooltipContentProps, ...tooltipCommonProps })

const { triggerRef, contentId } = inject(tooltipRootKey)!

const placement = ref(props.placement)
const strategy = ref(props.strategy)
const arrowRef = ref<HTMLElement | null>(null)

const { referenceRef, contentRef, middlewareData, x, y, update } = useFloating({
  placement,
  strategy,
  middleware: computed(() => {
    const middleware: Middleware[] = [offset(props.offset)]

    if(props.autoPlacement){
      middleware.push(
        autoPlacement()
      )
    }
    if (props.showArrow) {
      middleware.push(
        arrowMiddleware({
          arrowRef,
        })
      )
    }

    return middleware
  }),
})

const zIndex = useZIndex().nextZIndex()

const ns = useNamespace('tooltip')

const staticSide = computed(() => {
  return {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.value.split('-')[0]];
})

const contentStyle = computed<CSSProperties>(() => {
  return {
    position: unref(strategy),
    left: `${unref(x) || 0}px`,
    top: `${unref(y) || 0}px`,
    zIndex,
    background: '#222',
    color: 'white',
    padding: '8px',
    borderRadius: '4px',
    fontSize: '80%',
    pointerEvents: 'none'
  }
})

const arrowStyle = computed<CSSProperties>(() => {
  if (!props.showArrow) return {}
  const { arrow } = unref(middlewareData)
  if (!arrow) {
    return {}
  }

  return {
    left: arrow.x != null ? `${arrow.x}px` : '',
    top: arrow.y != null ? `${arrow.y}px` : '',
    right: '',
    bottom: '',
    [staticSide.value]: '-4px',
  }
})

const contentClass = computed(() => [
  ns.e('content'),
  // ns.is('dark', props.effect === 'dark'),
  ns.is(unref(strategy)),
  props.contentClass,
])

watch(triggerRef, () => update())

watch(
  () => props.placement,
  (val) => (placement.value = val)
)

onMounted(() => {
  watch(
    () => props.reference || triggerRef.value,
    (el) => {
      referenceRef.value = el || undefined
    },
    {
      immediate: true,
    }
  )
})

provide(tooltipContentKey, { arrowRef })
</script>
