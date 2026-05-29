import { ref } from 'vue'

export function useTypewriter(speed: number = 50) {
  const displayText = ref('')
  const isTyping = ref(false)

  let index = 0
  let text = ''
  let timeoutId: number

  const start = (newText: string, delay: number = 0) => {
    text = newText
    index = 0
    displayText.value = ''
    isTyping.value = true

    const run = () => {
      if (index < text.length) {
        displayText.value += text[index]
        index++
        timeoutId = window.setTimeout(run, speed)
      } else {
        isTyping.value = false
      }
    }

    if (delay > 0) {
      window.setTimeout(run, delay)
    } else {
      run()
    }
  }

  const stop = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    isTyping.value = false
  }

  const reset = () => {
    stop()
    displayText.value = ''
    index = 0
  }

  return {
    displayText,
    isTyping,
    start,
    stop,
    reset,
  }
}
