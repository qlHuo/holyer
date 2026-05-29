<script setup lang="ts">
import SocialLinks from './SocialLinks.vue'
import { socials } from '../data/socials'
import { useTypewriter } from '../composables/useTypewriter'

const props = defineProps<{
  name: string
  title: string
  motto: string
  avatar: string
}>()

const { displayText: displayedMotto, isTyping, start: startTypewriter } = useTypewriter(100)
startTypewriter(props.motto, 400)
</script>

<template>
  <section class="glass-card flex flex-col items-center justify-evenly py-6 animate-fade-in h-full">
    <div class="avatar-wrapper">
      <div class="avatar-glow"></div>
      <div class="w-20 h-20 rounded-full overflow-hidden border-2 border-white/50 shadow-md">
        <img :src="avatar" :alt="name" class="w-full h-full object-cover" />
      </div>
    </div>

    <div class="text-center">
      <h1 class="text-xl font-semibold text-text mb-1">{{ name }}</h1>
      <p class="text-sm text-text-muted mb-2">{{ title }}</p>
      <p class="text-sm text-accent h-5">
        "{{ displayedMotto }}"<span v-if="isTyping" class="animate-pulse">|</span>
      </p>
    </div>

    <SocialLinks class="mt-2" :socials="socials" />
  </section>
</template>

<style scoped>
.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.avatar-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 125%;
  height: 125%;
  transform: translate(-50%, -50%);
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    rgba(0, 113, 227, 0.6) 0%,
    rgba(0, 113, 227, 0.2) 40%,
    transparent 70%
  );
  animation: breathe 2.5s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}

.avatar-wrapper img {
  position: relative;
  z-index: 1;
}

@keyframes breathe {
  0%,
  100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.15);
  }
}

.avatar-wrapper:hover .avatar-glow {
  animation: breathe 1.2s ease-in-out infinite;
  background: radial-gradient(
    circle,
    rgba(0, 113, 227, 0.8) 0%,
    rgba(0, 113, 227, 0.3) 40%,
    transparent 70%
  );
}
</style>
