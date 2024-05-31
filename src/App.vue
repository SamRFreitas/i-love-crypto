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

    if (checkIfStoreCoinsIsEmpty()) {
        const usedCoins = store.getters.getUsedCoins

        const coinsFromCoinGecko = await services.coingeckoApi.fetchCoinList()

        const coinsToStore = coinsFromCoinGecko.filter((coin) => usedCoins.includes(coin.id))

        store.commit('SET_COINS', coinsToStore)

        const coins = store.getters.getCoins

        console.log('DEPOIS DE PREENCHER')
        console.log(coins)

        const storedValue = localStorage.getItem('coins')
        if (storedValue) {
            console.log('storedValue')
            console.log(storedValue)
            // return JSON.parse(storedValue)
        } else {
            console.log('Set Items')
            localStorage.setItem('coins', JSON.stringify(coins))
            // return defaultValue
        }

        const teste = localStorage.getItem('coins')
        console.log('ISSO E UM TESTE')
        console.log(teste)
    }

    state.loading.coins = false
})

function checkIfStoreCoinsIsEmpty() {
    const coins = store.getters.getCoins

    if (coins.length == 0) {
        // console.log('VAZIO')
        // console.log(coins)
        return true
    }

    // console.log('VAZIO')
    // console.log(coins)
    return false
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
