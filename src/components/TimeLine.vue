<template>
    <div>
      <label
        ref="labelRef"
        class="block text-sm font-bold leading-6 text-red-500 text-center mt-6"
      >
        {{ props.label }}
      </label>
      <div ref="lineRef" class="line bg-primary max-w-xs mt-1"></div>
    </div>
  </template>
  
  <script setup>
  import anime from 'animejs'
  import { ref, onMounted, getCurrentInstance } from 'vue'
  
  const props = defineProps({
    label: {
      type: String,
      default: 'This will long just one minute...',
    },
  })
  
  const lineRef = ref(null)
  const labelRef = ref(null)
  const instance = getCurrentInstance()
  
  onMounted(() => {
    animateLine()
  })
  
  const animateLine = () => {
    anime.timeline({
      complete: () => {
        // Emitir um evento personalizado para notificar o componente pai de que ele deve ser removido
        instance.emit('destroy')
      }
    })
      .add({
        targets: lineRef.value,
        width: '0px',
        easing: 'linear',
        duration: 60000, // 1 minuto
      })
      .add({
        targets: labelRef.value,
        opacity: 0,
        easing: 'linear',
        duration: 61000, // 1 minuto
      }, 0) // Inicia a animação do texto ao mesmo tempo que a linha
  }
  </script>
  
  <style scoped>
  .line {
    width: 100%;
    height: 4px;
    border-radius: 30px;
  }
  </style>
  