<template>
    <!-- <fv-popper>
        <fv-popper-trigger>
            <slot></slot>
        </fv-popper-trigger>
        <fv-popper-content>
            <slot name="content">
                <span v-if="rawContent" v-html="content"></span>
                <span v-else>{{ content }}</span>测试
            </slot>
            <fv-popper-arrow v-if="showArrow"></fv-popper-arrow>
        </fv-popper-content>
    </fv-popper> -->
    <span v-html="content"></span>
    <slot></slot><span>{{ content }}</span>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps<{
    content?: String
}>()
</script>