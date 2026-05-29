<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HeroSection from './components/HeroSection.vue'
import QuoteCard from './components/QuoteCard.vue'
import TimeWeatherCard from './components/TimeWeatherCard.vue'
import WebsiteList from './components/WebsiteList.vue'
import FooterSection from './components/FooterSection.vue'
import { websites } from './data/websites'
import { personInfo } from './data/personInfo'
import {
  useCursorEffects,
  initClickEffect,
  cleanupClickEffect,
} from './composables/useCursorEffects'

const currentYear = new Date().getFullYear()
const backgroundImage = ref('')

// 初始化 cursor 效果 (鼠标跟随)
useCursorEffects()

// 页面从不可见变可见时（如从其他 tab 切回），重新初始化点击效果
const handleVisibilityChange = () => {
  if (document.visibilityState === 'visible') {
    cleanupClickEffect()
    initClickEffect()
  }
}

// 初始化点击爆炸效果
onMounted(() => {
  initClickEffect()
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  cleanupClickEffect()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})

const getTodayKey = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
}

const fetchBackgroundImage = async () => {
  const cacheKey = `bing_bg_${getTodayKey()}`
  const cached = localStorage.getItem(cacheKey)

  if (cached) {
    backgroundImage.value = cached
    return
  }

  try {
    const res = await fetch('https://60s.holyer.site/v2/bing')
    const data = await res.json()
    if (data.data?.cover) {
      localStorage.setItem(cacheKey, data.data.cover)
      backgroundImage.value = data.data.cover
    }
  } catch (err) {
    console.error('Failed to fetch background image:', err)
  }
}

onMounted(() => {
  fetchBackgroundImage()
})
</script>

<template>
  <div
    class="min-h-screen flex flex-col"
    :style="
      backgroundImage
        ? {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }
        : {}
    "
  >
    <!-- 桌面端三列居中布局 - 水平和垂直居中 -->
    <main class="hidden lg:flex flex-1 items-center justify-center px-8 gap-8">
      <!-- 第一列：用户基础信息 -->
      <div class="w-72 h-90 shrink-0">
        <HeroSection
          :name="personInfo.name"
          :title="personInfo.title"
          :motto="personInfo.motto"
          :avatar="personInfo.avatar"
        />
      </div>

      <!-- 第二列：时间天气 + 一言 -->
      <div class="w-96 h-90 shrink-0 flex flex-col gap-6">
        <TimeWeatherCard />
        <QuoteCard />
      </div>

      <!-- 第三列：个人作品 -->
      <div class="w-96 h-90 shrink-0">
        <WebsiteList :websites="websites" />
      </div>
    </main>

    <!-- 移动端布局 -->
    <div class="lg:hidden flex flex-col min-h-screen">
      <div class="pt-8 px-4">
        <HeroSection
          :name="personInfo.name"
          :title="personInfo.title"
          :motto="personInfo.motto"
          :avatar="personInfo.avatar"
        />
      </div>

      <main class="flex-1 px-4 py-6 space-y-6">
        <TimeWeatherCard />
        <QuoteCard />
        <WebsiteList :websites="websites" />
      </main>

      <FooterSection :year="currentYear" />
    </div>

    <FooterSection :year="currentYear" class="hidden lg:block" />
  </div>
</template>
