<template>

    <div class="flex flex-row justify-center items-center w-full h-screen">

      <form @submit.prevent="tryToFetchHistoricalPrice" class="bg-white h-60 flex flex-col space-y-6">

        <label class="block text-xl font-medium leading-6 text-gray-900"> Historical Price </label>

        <SelectCoin v-model="state.selectedCoin" :disabled="state.loading.historicalPrice" />

        <div> 
          <label class="block text-sm font-medium leading-6 text-gray-900"> Select Datetime </label>
          <VueDatePicker class="mt-2" :class="datePickerIsDisabled ? 'cursor-not-allowed' : ''" v-model="state.datetime" :disabled="datePickerIsDisabled"/>
          <label v-if="state.errors.dateTimeError.empty" class="block text-xs font-medium leading-6 text-red-500 text-start"> {{ state.errors.dateTimeError.message }} </label>
        </div>
        
        <button type="submit" class="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full flex justify-center" :class="state.errors.dateTimeError.empty ? 'opacity-50 cursor-not-allowed focus:bg-primary': ''">

          <Loader v-if="state.loading.historicalPrice" width="20px" height="20px" top="2px" left="2px" right="2px" bottom="2px" />
          <span v-else>Searh Historical Price</span>

        </button>
      </form>
      
    </div>
   
</template>

<script setup>
// @ is an alias to /src
import SelectCoin from '@/components/SelectCoin.vue'
import {reactive, computed, watch} from 'vue'
// import services from '@/services'
import Loader from '@/components/Loader.vue'

  const state = reactive({
    selectedCoin: null,
    datetime: null,
    errors: {
      dateTimeError: {
        empty: false,
        message: 'Empty Datetime - Please, select a datetime'
      }
    },
    loading: {
      historicalPrice: false
    }
  })

  const datePickerIsDisabled = computed(() => {
    return state.loading.historicalPrice
  })

  watch(() => state.datetime, (newValue) => {
    
    console.log(state.datetime)
    if (newValue != null) {
      state.errors.dateTimeError.empty = false
    }

  })

  console.log(state.datetime)
  console.log(state.errors.dateTimeError.empty || state.loading.historicalPrice)

  const tryToFetchHistoricalPrice = () => {

      state.loading.historicalPrice = true

      if (state.datetime == null) {
        state.errors.dateTimeError.empty = true
        state.loading.historicalPrice = false
        return
      }

      console.log('DEPOIS')
      
  }
 
</script>