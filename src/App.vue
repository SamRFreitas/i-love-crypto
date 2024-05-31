<template>
    <Loading v-if="state.loading.coins" />
    <router-view v-else />
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import Loading from './views/Loading.vue'
import services from './services'

const state = reactive({
    loading: {
        coins: false,
    },
})

const store = useStore()

onBeforeMount(async () => {
    state.loading.coins = true

    const fetchData = async () => {

        try {
            const usedCoins = store.getters.getUsedCoins
            const coinsFromCoinGecko = await services.coingeckoApi.fetchCoinList()
            const coinsToStore = coinsFromCoinGecko.filter((coin) => usedCoins.includes(coin.id))
            store.commit('SET_COINS', coinsToStore)
            localStorage.setItem('coins', JSON.stringify(coinsToStore))
            state.loading.coins = false
        } catch (e) {
            console.error('Error fetching coins:', e.message)
            // Tentar novamente até 3 vezes
            if (state.retryAttempts < 3) {
                state.retryAttempts++
                setTimeout(fetchData, 60000) // Tentar novamente após 1 minuto
            } else {
                state.loading.coins = false
                console.error('Failed to fetch coins after 3 attempts')
            }
        }
        
    }

    state.retryAttempts = 0
    fetchData() // Chamada inicial ao serviço
})
</script>

<style>
/* Your styles here */
</style>
