<template>
      <input
        type="datetime-local"
        id="datetime"
        v-model="selectedDateTime"
        @input="updateDateTime"
        class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-pointer focus:cursor-pointer"
      />
</template>

<script setup>

</script>

<style scoped>
.datetime-picker {
  max-width: 300px;
}
input[type="datetime-local"] {
  cursor: pointer;
}
input[type="datetime-local"]:focus {
  cursor: pointer;
}
</style>
