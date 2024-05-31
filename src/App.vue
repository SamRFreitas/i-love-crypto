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

const fetchCoins = async () => {

    state.loading.coins = true

    
    let coinsFromCoinGecko

    if (checkIfStoreCoinsIsEmpty()) {

        try {
            
            coinsFromCoinGecko = await services.coingeckoApi.fetchCoinList()
            
            const coinsToStore = coinsFromCoinGecko.filter((coin) => usedCoins.includes(coin.id))

            store.commit('SET_COINS', coinsToStore)

            const coins = store.getters.getCoins

            console.log('DEPOIS DE PREENCHER')
            console.log(coins)

        } catch (e) {
            console.log(e)
        }

    }

    const usedCoins = store.getters.getUsedCoins

    state.loading.coins = false
}

onBeforeMount(fetchCoins)

function checkIfStoreCoinsIsEmpty() {
    const coins = store.getters.getCoins

    return coins.length === 0
}

</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>
