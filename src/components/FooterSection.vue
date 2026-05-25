<script setup lang="ts">
defineProps<{
  year: number;
}>();
</script>

<template>
  <footer class="py-5 text-center text-text-muted text-sm tracking-wider bg-white/60 backdrop-filter backdrop-blur-sm border-t border-border">
    <p>Copyright © {{ year }} Built with Vue3 + TypeScript + TailwindCSS By Holyer</p>
  </footer>
</template>