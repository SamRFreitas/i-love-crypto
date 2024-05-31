import axios from 'axios'
import CoinGeckoApiService from './coingeckoapi'

const cgApiClient = axios.create({
    baseURL: process.env.VUE_APP_COIN_GECKO_BASE_URL,
})

export default {
    coingeckoApi: CoinGeckoApiService(cgApiClient),
}
