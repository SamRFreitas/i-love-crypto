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
        <label class="block text-md font-medium leading-6 text-gray-900">$ {{ state.price }}</label>
      </div>

    </div>
    
  </template>
  
<script setup>
  import { defineProps, reactive, onBeforeMount} from 'vue'
  import CoinImage from '@/components/CoinImage.vue'
  import services from '@/services'
  
  const props = defineProps({
    coin: { type: Object, required: true }
  })

  const state = reactive({
    price: null,
    loading: {
      price: false
    },
  })

  onBeforeMount(async () => {

    state.loading.price = true

    await services.coingeckoApi.fetchSimplePrice({ cryptoID: props.coin.id, currencyForCryptoValue: 'usd'})
    .then(response => {

        state.price = response.data

        console.log(state.price)

        state.loading.price = false

    })


  })
 
</script>
  
  