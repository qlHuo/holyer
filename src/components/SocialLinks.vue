<script setup lang="ts">
import type { SocialLink } from '../types';
import IconImage from './IconImage.vue';

defineProps<{
  socials: SocialLink[];
}>();
</script>

<template>
  <div class="flex gap-4 justify-center items-center">
    <a
      v-for="social in socials"
      :key="social.name"
      :href="social.url"
      target="_blank"
      rel="noopener noreferrer"
      class="opacity-60 hover:opacity-100 transition-opacity duration-200"
      :title="social.name"
    >
      <IconImage :src="social.icon" :alt="social.name" fallback="🔗" size="w-6 h-6" />
    </a>
  </div>
</template>