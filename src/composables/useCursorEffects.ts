import { onMounted, onUnmounted } from 'vue';
import { trailingCursor, bubbleCursor, snowflakeCursor, emojiCursor, ghostCursor, followingDotCursor, fairyDustCursor, rainbowCursor } from 'cursor-effects';
import { cursorConfig, type CursorType } from '../data/cursor';

let cursorInstance: { destroy: () => void } | null = null;

const cursorCreators = {
  trailing: trailingCursor,
  bubble: bubbleCursor,
  snowflake: snowflakeCursor,
  emoji: emojiCursor,
  ghost: ghostCursor,
  followingDot: followingDotCursor,
  fairyDust: fairyDustCursor,
  rainbow: rainbowCursor,
};

export function useCursorEffects() {
  const initCursor = () => {
    if (cursorInstance) {
      cursorInstance.destroy();
      cursorInstance = null;
    }

    const cursorType = cursorConfig.type as CursorType;
    if (cursorType && cursorCreators[cursorType]) {
      const creator = cursorCreators[cursorType];
      const options = cursorConfig.options?.[cursorType];
      cursorInstance = creator(options as any);
    }
  };

  onMounted(() => {
    initCursor();
  });

  onUnmounted(() => {
    if (cursorInstance) {
      cursorInstance.destroy();
      cursorInstance = null;
    }
  });

  return {
    initCursor,
  };
}

// 点击爆炸效果
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

const colors = ['#0071e3', '#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3'];

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let rafId: number | null = null;
let resizeHandler: (() => void) | null = null;

function ensureCanvas() {
  if (canvas) return;

  canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;';
  document.body.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');

  resizeHandler = () => {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };
  window.addEventListener('resize', resizeHandler);
}

function renderFrame() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter(p => p.life > 0);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15;
    p.life -= 0.02;

    if (p.life <= 0) continue;

    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx.fill();
  }

  if (particles.length > 0) {
    rafId = requestAnimationFrame(renderFrame);
  }
}

export function createClickExplosion(x: number, y: number) {
  ensureCanvas();
  if (!ctx) return;

  const count = 15;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const speed = 4 + Math.random() * 5;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 5 + Math.random() * 5,
    });
  }

  if (rafId === null) {
    rafId = requestAnimationFrame(renderFrame);
  }
}

export function destroyClickEffect() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
    resizeHandler = null;
  }

  if (canvas) {
    canvas.remove();
    canvas = null;
    ctx = null;
  }

  particles = [];
}

export function initClickEffect() {
  document.addEventListener('mousedown', createClickExplosionWrapper);
}

function createClickExplosionWrapper(e: MouseEvent) {
  createClickExplosion(e.clientX, e.clientY);
}

export function cleanupClickEffect() {
  document.removeEventListener('mousedown', createClickExplosionWrapper);
  destroyClickEffect();
}