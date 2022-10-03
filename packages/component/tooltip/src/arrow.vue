<template>
  <div ref="arrowRef" :style="arrowStyle" :class="ns.e('arrow')" />
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { tooltipContentKey, tooltipRootKey } from '@fv/utils'
import { tooltipArrowProps, tooltipArrowSpecialProps } from './arrow'

import type { CSSProperties } from 'vue'

const props = defineProps({
  ...tooltipArrowProps,
  ...tooltipArrowSpecialProps,
})

const { ns } = inject(tooltipRootKey)!
const { arrowRef } = inject(tooltipContentKey)!

const arrowStyle = computed<CSSProperties>(() => {
  const { style, width, height } = props
  // const namespace = ns.namespace.value

  return {
    position: 'absolute',
    background: '#222',
    width:  `${width}px`,
    height: `${height}px`,
    transform: 'rotate(45deg)',
    ...(style || {}),
  }
})
</script>
