<template>

    <label class="block text-3xl font-medium leading-6 text-gray-900 mt-12 text-primary text-center"> I Love Crypto </label>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gt gap-4 mt-12 w-full flex justify-center items-center px-4 md:px-12">

        <CoinCard v-for="coin in state.coins" :key="coin.id" :coin="coin"/>

    </div>

    <div class="flex flex-col items-center w-full h-screen mt-12 px-4">

        <form @submit.prevent="tryToFetchHistoricalPrice" class="w-full max-w-xs flex flex-col space-y-6">
            <label class="block text-xl font-medium leading-6 text-gray-900 text-center"> Historical Price </label>

            <SelectCoin :coins="state.coins" v-model="state.selectedCoin" :disabled="state.loading.historicalPrice" />

            <div>
                <label class="block text-sm font-medium leading-6 text-gray-900"> Select Datetime </label>
                <VueDatePicker class="mt-2" :class="datePickerIsDisabled ? 'cursor-not-allowed' : ''" v-model="state.datetime" :disabled="datePickerIsDisabled" />
                <label v-if="state.errors.dateTimeError.empty" class="block text-xs font-medium leading-6 text-red-500 text-start"> {{ state.errors.dateTimeError.message }} </label>
            </div>

            <button type="submit" class="bg-primary text-white font-bold py-2 px-4 rounded-full flex justify-center" :class="[state.errors.dateTimeError.empty ? 'opacity-50 cursor-not-allowed focus:bg-primary' : '', state.loading.historicalPrice ? 'hover:bg-primary' : 'hover:bg-primary-dark' ]">
                <Loader v-if="state.loading.historicalPrice" width="20px" height="20px" top="2px" left="2px" right="2px" bottom="2px" />
                <span v-else>Searh Historical Price</span>
            </button>

        </form>

        <HistoricalPriceCard v-if="state.historicalPrice" :historicalData="state.historicalData" />
  
    </div>

</template>

<script setup>
// @ is an alias to /src
import SelectCoin from '@/components/SelectCoin.vue'
import { reactive, computed, watch } from 'vue'
import Loader from '@/components/Loader.vue'
import { useStore } from 'vuex'
import useDate from '@/composables/useDate'
import services from '@/services'
import HistoricalPriceCard from '@/components/HistoricalPriceCard.vue'
import CoinCard from '@/components/CoinCard.vue'
import useCurrency from '@/composables/useCurrency'

const state = reactive({
    coins: null,
    selectedCoin: null,
    datetime: null,
    errors: {
        dateTimeError: {
            empty: false,
            message: 'Empty Datetime - Please, select a datetime',
        },
    },
    historicalPrice: null,
    loading: {
        historicalPrice: false,
    },
    historicalData: {
        coin: null,
        price: null,
        datetime: null,
    },
})

const store = useStore()
const { formatCryptoValueIn } = useCurrency()

state.coins = store.getters.getCoins

state.selectedCoin = state.coins[0]

const datePickerIsDisabled = computed(() => {
    return state.loading.historicalPrice
})

watch(
    () => state.datetime,
    (newValue) => {
        if (newValue != null) {
            state.errors.dateTimeError.empty = false
        }
    }
)

const tryToFetchHistoricalPrice = async () => {
    state.loading.historicalPrice = true

    if (state.datetime == null) {
        state.errors.dateTimeError.empty = true
        state.loading.historicalPrice = false
        return
    }

    const { range } = useDate(state.datetime)
    console.log(state.selectedCoin)


    try {
            await services.coingeckoApi
            .fetchHistoricalDataWithTimeRange({ cryptoID: state.selectedCoin.id, currencyForCryptoValue: 'usd', range })
            .then((response) => {
                if (response.status === 200) {
                    console.log('200')
                    console.log(response.data.prices)
                    state.historicalPrice = response.data.prices[0][1]
                    console.log(state.historicalPrice)
                    console.log(state.selectedCoin)
                    state.historicalData.coin = state.selectedCoin
                    state.historicalData.price = formatCryptoValueIn('usd', state.historicalPrice)
                    state.historicalData.datetime = state.datetime
                }
            })
        } catch (e) {
            
            console.error('Error fetching coins:', e.message)
            
        }

    

    state.loading.historicalPrice = false
}
</script>