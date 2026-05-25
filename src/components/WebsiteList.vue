<script setup lang="ts">
import { ref, computed } from 'vue';
import type { WebsiteItem } from '../types';
import IconImage from './IconImage.vue';

const props = defineProps<{
  websites: WebsiteItem[];
}>();

const currentIndex = ref(0);
const itemsPerPage = 6;
const totalPages = computed(() => Math.ceil(props.websites.length / itemsPerPage));

const visibleWebsites = computed(() => {
  const start = currentIndex.value * itemsPerPage;
  return props.websites.slice(start, start + itemsPerPage);
});

const canScrollLeft = computed(() => currentIndex.value > 0);
const canScrollRight = computed(() => currentIndex.value < totalPages.value - 1);

const scrollLeft = () => {
  if (canScrollLeft.value) currentIndex.value--;
};

const scrollRight = () => {
  if (canScrollRight.value) currentIndex.value++;
};
</script>

<template>
  <section class="glass-card flex flex-col h-full">
    <h2 class="text-sm font-medium text-text-muted text-center mb-4 tracking-wider">个人作品</h2>

    <!-- 卡片列表 -->
    <div class="grid grid-cols-2 gap-3 content-start flex-1">
      <a
        v-for="site in visibleWebsites"
        :key="site.name"
        :href="site.url"
        target="_blank"
        rel="noopener noreferrer"
        class="card flex items-center gap-3 py-3 px-3"
      >
        <IconImage :src="site.icon" :alt="site.name" fallback="🌐" size="w-8 h-8" />
        <span class="text-sm font-medium text-text truncate">{{ site.name }}</span>
      </a>
    </div>

    <!-- 轮播导航 -->
    <div v-if="totalPages > 1" class="flex items-center justify-center gap-4 mt-4 shrink-0">
      <button
        @click="scrollLeft"
        :disabled="!canScrollLeft"
        class="w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-text hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        ‹
      </button>

      <div class="flex gap-1.5">
        <span
          v-for="i in totalPages"
          :key="i"
          class="w-2 h-2 rounded-full transition-colors"
          :class="i - 1 === currentIndex ? 'bg-accent' : 'bg-border'"
        ></span>
      </div>

      <button
        @click="scrollRight"
        :disabled="!canScrollRight"
        class="w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-text hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        ›
      </button>
    </div>
  </section>
</template>