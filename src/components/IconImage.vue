<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  src: string;
  alt: string;
  fallback?: string;
  size?: string;
}>();

const imgError = ref(false);

const handleError = () => {
  imgError.value = true;
};

const displayIcon = () => {
  if (imgError.value || !props.src) {
    return props.fallback || '📎';
  }
  return null;
};
</script>

<template>
  <img
    v-if="!imgError && src"
    :src="src"
    :alt="alt"
    class="object-contain shrink-0"
    :class="size || 'w-6 h-6'"
    @error="handleError"
  />
  <span v-else class="text-xl shrink-0">{{ displayIcon() }}</span>
</template>