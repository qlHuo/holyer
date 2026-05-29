import { ref, onMounted, onUnmounted } from 'vue'

export function useTilt(elementRef: { value: HTMLElement | null }) {
  const rotateX = ref(0)
  const rotateY = ref(0)

  const handleMouseMove = (e: MouseEvent) => {
    if (!elementRef.value) return

    const rect = elementRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) / rect.width
    const deltaY = (e.clientY - centerY) / rect.height

    rotateX.value = -deltaY * 12
    rotateY.value = deltaX * 12
  }

  const handleMouseLeave = () => {
    rotateX.value = 0
    rotateY.value = 0
  }

  onMounted(() => {
    const el = elementRef.value
    if (el) {
      el.addEventListener('mousemove', handleMouseMove)
      el.addEventListener('mouseleave', handleMouseLeave)
    }
  })

  onUnmounted(() => {
    const el = elementRef.value
    if (el) {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  })

  return {
    rotateX,
    rotateY,
  }
}
