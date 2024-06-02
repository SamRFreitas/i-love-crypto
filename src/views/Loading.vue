<template>
    <div class="bg-primary flex flex-col justify-center items-center h-screen">
        <div class="flex flex-col justify-center items-center">
            <Loader />
            <p class="ts text-gradient display-5 text-white ms-2 mt-6">
                {{ props.onLoadingText }}
            </p>
        </div>
    </div>
</template>
<script setup>
import Loader from '@/components/Loader.vue'
const props = defineProps({
    onLoadingText: {
        type: String,
        default: 'Loading Cryptos...',
    },
})
</script>
<style scoped>
.ts {
    text-shadow: 0 0 10px #fff;
}
</style>
