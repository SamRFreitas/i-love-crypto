<template>
    <img :src="require(`../assets/images/${props.id}.png`)" alt="" class="flex-shrink-0 rounded-full" :class="[width, height]" />
</template>

<script setup>
const props = defineProps({
    id: { type: String, required: true },
    width: { type: String, default: 'w-5' },
    height: { type: String, default: 'h-5' },
})
</script>
