<template>

    <div class="w-full max-w-md flex flex-col h-32 justify-center items-center space-y-2 px-4 md:shadow-xl border rounded-md w-full">
        
        <CoinImage :id="props.coin.id" :width="'w-8'" :height="'h-8'" />

        <label class="block text-md font-medium leading-6 text-gray-900">{{ props.coin.name }}</label>

        <div v-if="state.loading.price" class="animate-pulse flex flex-col items-center space-y-2">
            <div class="flex flex-row justify-center items-cdnter w-full">
                <div class="bg-gray-200 h-4 w-36 rounded ml-3"></div>
            </div>
        </div>

        <div v-else class="flex flex-row justify-between w-full">
            <label class="block text-md font-medium leading-6 text-gray-900">{{ props.coin.symbol.toUpperCase() }}</label>
        
            <label  class="block text-md font-medium leading-6 text-gray-900"> {{ state.price }}</label>
        </div>
        
    </div>

</template>

<script setup>
import { defineProps, reactive, onBeforeMount, onMounted, onUnmounted } from 'vue'
import CoinImage from '@/components/CoinImage.vue'
import services from '@/services'
import useCurrency from '@/composables/useCurrency'
import { useStore } from 'vuex'
const props = defineProps({
    coin: { type: Object, required: true },
})

const state = reactive({
    price: null,
    loading: {
        price: false,
    },
})
const store = useStore()
const { formatCryptoValueIn } = useCurrency()

const fetchPrice = async () => {

    state.loading.price = true

    try {
        const response = await services.coingeckoApi.fetchSimplePrice({ cryptoID: props.coin.id, currencyForCryptoValue: 'usd' })
        const unformattedPrice = response.data[`${props.coin.id}`]['usd']

        const digits = props.coin.id == 'dacxi' ? 8 : 2
        state.price = formatCryptoValueIn('usd', unformattedPrice, digits)

        store.commit('SET_PRICE', { symbol: props.coin.symbol.toUpperCase(), price: state.price })

        state.loading.price = false
                
    } catch (error) {
    
        state.price = store.getters.getPriceBySymbol(props.coin.symbol.toUpperCase()).price
        console.log('COIN CARD')
        console.log(state.price)
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
