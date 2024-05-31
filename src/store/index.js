import { createStore } from 'vuex'

export default createStore({
    state: {
        usedCoins: ['bitcoin', 'dacxi', 'ethereum', 'cosmos'],
        coins: [],
        prices: []
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
        getPriceBySymbol: (state) => (symbol) => {

            if (state.prices.length === 0) {
                const storedPrices = localStorage.getItem('prices')
                if (storedPrices) {
                    state.prices = JSON.parse(storedPrices)
                }
            }

            const price = state.prices.find((price) => price.symbol === symbol)

            return price
        },
    },
    mutations: {
        SET_COINS(state, coins) {
            state.coins = coins
            localStorage.setItem('coins', JSON.stringify(coins))
        },
        SET_PRICE(state, price) {

            if (!state.prices.some(p => p.symbol === price.symbol)) {

                state.prices.push(price)
                localStorage.setItem('prices', JSON.stringify(state.prices))

            }
            
          },
    },
    actions: {},
    modules: {},
})
