<template>

    <div class="mt-6 max-w-lg flex flex-col h-32 justify-center items-center space-y-3 px-4 md:shadow-xl border rounded-md w-full">

        <CoinImage :id="props.historicalData.coin.id" :width="'w-8'" :height="'h-8'" />
        
        <div class="flex flex-row justify-between w-full">
            <label class="block text-md font-medium leading-6 text-gray-900"> {{ props.historicalData.coin.name }} Price: </label>
            <label class="block text-md font-medium leading-6 text-gray-900"> ${{ props.historicalData.price }} </label>
        </div>

        <div class="flex flex-row justify-between w-full">
            <label class="block text-md font-medium leading-6 text-gray-900"> Date: </label>
            <label class="block text-md font-medium leading-6 text-gray-900"> {{ formatDate(props.historicalData.datetime) }} </label>
        </div>

    </div>
    
</template>

<script setup>
import CoinImage from '@/components/CoinImage.vue'
import useDate from '@/assets/composables/useDate'

    const props = defineProps({
        historicalData: { type: Object  }
    })

    const { formatDate } = useDate()

</script>