<template>
    <div v-if="state.loading.price" class="w-full max-w-md flex flex-col h-32 justify-center items-center space-y-2 px-4 md:shadow-xl border rounded-md w-full">
        <div class="animate-pulse flex flex-col items-center space-y-2">
            <div class="bg-gray-200 h-8 w-8 rounded-full"></div>

            <div class="bg-gray-200 h-4 w-20 rounded"></div>

            <div class="flex flex-row justify-between w-full">
                <div class="bg-gray-200 h-4 w-28 rounded"></div>
            </div>
        </div>
    </div>

    <div v-else class="w-full max-w-md flex flex-col h-32 justify-center items-center space-y-2 px-4 md:shadow-xl border rounded-md w-full">
        <CoinImage :id="props.coin.id" :width="'w-8'" :height="'h-8'" />

        <label class="block text-md font-medium leading-6 text-gray-900">{{ props.coin.name }}</label>

        <div class="flex flex-row justify-between w-full">
            <label class="block text-md font-medium leading-6 text-gray-900">{{ props.coin.symbol.toUpperCase() }}</label>
            <label class="block text-md font-medium leading-6 text-gray-900"> {{ state.price }}</label>
        </div>
        
    </div>
</template>

<script setup>
import { defineProps, reactive, onBeforeMount, onMounted, onUnmounted } from 'vue'
import CoinImage from '@/components/CoinImage.vue'
import services from '@/services'
import useCurrency from '@/composables/useCurrency'

const props = defineProps({
    coin: { type: Object, required: true },
})

const state = reactive({
    price: null,
    loading: {
        price: false,
    },
})

const { formatCryptoValueIn } = useCurrency()

const fetchPrice = async () => {

    console.log('CHAMOU fetchPrice')

    state.loading.price = true

    try {
        const response = await services.coingeckoApi.fetchSimplePrice({ cryptoID: props.coin.id, currencyForCryptoValue: 'usd' })
        const unformattedPrice = response.data[`${props.coin.id}`]['usd']

        const digits = props.coin.id == 'dacxi' ? 8 : 2
        state.price = formatCryptoValueIn('usd', unformattedPrice, digits)

        
        if(!response.data[`${props.coin.id}`]['usd']) {
            console.log('ERRO')
        }

        state.loading.price = false
                
    } catch (error) {

        console.log('ERROR COIN CARD')
        console.log('ERROR COIN CARD')
        console.log('ERROR COIN CARD')
        console.log('ERROR COIN CARD')
        console.log('ERROR COIN CARD')

        if (error.response && error.response.status === 429) {
            console.log('error 429 FDP')
            // Too Many Requests error, wait for a while before trying again
            // await new Promise((resolve) => setTimeout(resolve, 5000)) // Wait for 5 seconds
            // fetchPrice() // Try again
        } else {
            console.error('An error occurred:', error.message)
            state.loading.price = false
        }

    }

}

onBeforeMount(fetchPrice)

let interval

onMounted(() => {
    setTimeout(() => {
        interval = setInterval(fetchPrice, 60000) 
    }, 60000)
})

onUnmounted(() => {
    clearInterval(interval)
})


</script>
