<template>
    <div :style="loaderStyle" class="loader" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    width: { type: String, default: '150px' },
    height: { type: String, default: '150px' },
    top: { type: String, default: '6px' },
    left: { type: String, default: '6px' },
    right: { type: String, default: '6px' },
    bottom: { type: String, default: '6px' },
})

const loaderStyle = computed(() => ({
    '--loader-width': props.width,
    '--loader-height': props.height,
    '--before-top': props.top,
    '--before-left': props.left,
    '--before-right': props.right,
    '--before-bottom': props.bottom,
    width: props.width,
    height: props.height,
}))
</script>

<style scoped>
.loader {
    position: relative;
    width: var(--loader-width);
    height: var(--loader-height);
    border-radius: 50%;
    background: linear-gradient(45deg, transparent, transparent 40%, #fff);
    animation: animate 2s linear infinite;
}

.loader::before {
    content: '';
    position: absolute;
    top: var(--before-top);
    left: var(--before-left);
    right: var(--before-right);
    bottom: var(--before-bottom);
    background: #aa69ff;
    border-radius: 50%;
    z-index: 1000;
}

.loader::after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border-radius: 50%;
    background: linear-gradient(45deg, transparent, transparent 40%, #fff);
    z-index: 1;
    filter: blur(30px);
}

@keyframes animate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
