<script setup lang="ts">
import { ref, onMounted } from 'vue'

const quote = ref<{ hitokoto: string; from?: string }>({
  hitokoto: '加载中...',
  from: '',
})

const fetchQuote = async () => {
  try {
    const res = await fetch('https://60s.holyer.site/v2/hitokoto')
    const data = await res.json()
    if (data.data?.hitokoto) {
      quote.value = {
        hitokoto: data.data.hitokoto,
        from: data.data.from || '',
      }
    }
  } catch {
    quote.value = {
      hitokoto: '山不在高，水不在深。',
      from: '',
    }
  }
}

onMounted(fetchQuote)
</script>

<template>
  <section class="glass-card text-center animate-fade-in h-full flex flex-col justify-between">
    <h2 class="text-sm font-medium text-text-muted text-center mb-4 tracking-wider">每日一言</h2>
    <blockquote class="flex-1 flex flex-col justify-center">
      <p class="text-sm text-text leading-relaxed">「{{ quote.hitokoto }}」</p>
      <cite v-if="quote.from" class="text-xs text-accent block mt-2">—— {{ quote.from }}</cite>
    </blockquote>
  </section>
</template>
