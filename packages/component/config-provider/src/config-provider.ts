import { defineComponent, renderSlot, watch } from 'vue'
import { buildProps } from '@fv/utils'
import { provideGlobalConfig } from '@fv/hooks'

import type { ExtractPropTypes } from 'vue'


export const configProviderProps = buildProps({


  // Controls if we should handle keyboard navigation
  keyboardNavigation: {
    type: Boolean,
    default: true,
  },


  zIndex: Number,

  namespace: {
    type: String,
    default: 'fv',
  },
} as const)
export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

const ConfigProvider = defineComponent({
  props: configProviderProps,

  setup(props, { slots }) {
    const config = provideGlobalConfig(props)
    return () => renderSlot(slots, 'default', { config: config?.value })
  },
})
export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>

export default ConfigProvider
