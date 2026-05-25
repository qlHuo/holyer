<script setup lang="ts">
import SocialLinks from './SocialLinks.vue';
import { socials } from '../data/socials';

defineProps<{
  name: string;
  title: string;
  motto: string;
  avatar: string;
}>();
</script>

<template>
  <section class="glass-card flex flex-col items-center justify-evenly py-6 animate-fade-in h-full">
    <div class="w-20 h-20 rounded-full overflow-hidden border-2 border-white/50 shadow-md">
      <img :src="avatar" :alt="name" class="w-full h-full object-cover" />
    </div>

    <div class="text-center">
      <h1 class="text-xl font-semibold text-text mb-1">{{ name }}</h1>
      <p class="text-sm text-text-muted mb-2">{{ title }}</p>
      <p class="text-sm text-accent">"{{ motto }}"</p>
    </div>

    <SocialLinks class="mt-2" :socials="socials" />
  </section>
</template>