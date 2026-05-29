<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('');
const currentDate = ref('');
const lunarDate = ref('');
const solarTerm = ref('');
const weather = ref({
  temp: 0,
  weather: '晴',
  location: '杭州',
  icon: '☀️',
});

let timeInterval: number;

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  currentDate.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  });
};

const getWeatherIcon = (condition: string): string => {
  const iconMap: Record<string, string> = {
    晴: '☀️',
    多云: '⛅',
    阴: '☁️',
    雨: '🌧️',
    雪: '❄️',
    雷: '⛈️',
    雾: '🌫️',
    沙尘: '🌪️',
    霾: '🌫️',
  };
  return iconMap[condition] || '☀️';
};

const fetchWeather = async () => {
  try {
    const res = await fetch('https://60s.holyer.site/v2/weather?query=杭州');
    const data = await res.json();

    if (data.data?.weather) {
      const w = data.data.weather;
      weather.value = {
        temp: w.temperature || 0,
        weather: w.condition || '未知',
        location: data.data.location?.name || '杭州',
        icon: getWeatherIcon(w.condition),
      };
    }
  } catch {
    weather.value = {
      temp: 25,
      weather: '晴',
      location: '杭州',
      icon: '☀️',
    };
  }
};

const fetchLunar = async () => {
  try {
    const res = await fetch('https://60s.holyer.site/v2/lunar');
    const data = await res.json();
    if (data.data?.lunar) {
      const lunar = data.data.lunar;
      lunarDate.value = `${lunar.year}年${lunar.month}月${lunar.day}`;
    }
    if (data.data?.term?.stage?.name) {
      solarTerm.value = data.data.term.stage.name;
    }
  } catch {
    lunarDate.value = '';
  }
};

onMounted(() => {
  updateTime();
  timeInterval = window.setInterval(updateTime, 1000);
  fetchWeather();
  fetchLunar();
});

onUnmounted(() => {
  clearInterval(timeInterval);
});
</script>

<template>
  <section
    class="glass-card flex flex-row gap-8 items-stretch justify-center animate-fade-in h-full px-4 pt-4 pb-4"
  >
    <!-- 时间日期区域 -->
    <div class="text-center shrink-0 flex flex-col justify-between">
      <p class="text-sm text-text-muted tracking-wider">当前时间</p>
      <div class="flex-1 flex flex-col items-center justify-center">
        <p class="text-2xl font-light font-mono text-text">{{ currentTime }}</p>
        <p class="text-xs text-text-muted mt-1">{{ currentDate }}</p>
        <p v-if="lunarDate" class="text-xs text-accent mt-1">{{ lunarDate }}</p>
      </div>
    </div>

    <div class="w-px bg-border"></div>

    <!-- 天气区域 -->
    <div class="text-center shrink-0 flex flex-col justify-between">
      <p class="text-sm text-text-muted tracking-wider">天气</p>
      <div class="flex-1 flex items-center gap-2">
        <span class="text-2xl">{{ weather.icon }}</span>
        <div>
          <p class="text-lg font-light text-text">{{ weather.temp }}°C</p>
          <p class="text-xs text-text-muted">{{ weather.weather }} · {{ weather.location }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
