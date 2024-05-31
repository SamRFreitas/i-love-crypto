import { createStore } from 'vuex'

export default createStore({
    state: {
        usedCoins: ['bitcoin', 'dacxi', 'ethereum', 'cosmos'],
        coins: [],
    },
    getters: {
        getUsedCoins: (state) => {
            return state.usedCoins
        },
        getCoins: (state) => {

            if (state.coins.length === 0) {

                const storedCoins = localStorage.getItem('coins')

                if (storedCoins) {
                    state.coins = JSON.parse(storedCoins)
                }

            }

            return state.coins
            
        },
        getCoinById: (state) => (id) => {
            return state.coins.find((coin) => coin.id === id)
        },
    },
    mutations: {
        SET_COINS(state, coins) {
            state.coins = coins
        },
    },
    actions: {},
    modules: {},
})
