<template>
    <Listbox as="div" v-model="selectedCoin">
        <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Select Currency</ListboxLabel>
        <div class="relative mt-2">
            <ListboxButton
                :class="[
                    'relative w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 cursor-pointer',
                    { 'opacity-50 cursor-not-allowed': props.disabled },
                ]"
            >
                <span v-if="selectedCoin" class="flex items-center">
                    <CoinImage :id="selectedCoin.id" />
                    <span class="block text-md font-medium leading-6 text-gray-900 ml-3">{{ formatedCoinLabel(selectedCoin) }}</span>
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ListboxOptions v-if="!props.disabled" class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ListboxOption as="template" v-for="coin in coins" :key="coin.id" :value="coin" v-slot="{ active, selectedCoin }">
                        <li :class="[active ? 'bg-primary text-white' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-3 pr-9']">
                            <div class="flex items-center">
                                <CoinImage :id="coin.id" />
                                <span :class="[selectedCoin ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{ formatedCoinLabel(coin) }}</span>
                            </div>

                            <span v-if="selectedCoin" :class="[active ? 'text-white' : 'text-primary', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import CoinImage from '@/components/CoinImage.vue'

const props = defineProps({
    disabled: {
        type: Boolean,
    },
    coins: {
        type: Array,
        required: true,
    },
    value: {
        type: Object,
    },
})

const selectedCoin = ref(props.coins[0])

const formatedCoinLabel = (coin) => {
    return `${coin.name} (${coin.symbol.toUpperCase()})`
}

const emits = defineEmits(['update:value'])

watch(selectedCoin, (newValue) => {
    emits('update:value', newValue)
})
</script>
