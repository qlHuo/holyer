/**
 * Cursor Effects Configuration
 *
 * 支持的效果类型:
 * - 'trailing' 拖尾效果 (默认)
 * - 'bubble' 气泡效果
 * - 'snowflake' 雪花效果
 * - 'emoji' emoji表情效果
 * - 'ghost' 幽灵效果
 * - 'followingDot' 跟随点效果
 * - 'fairyDust' fairy dust效果
 * - 'rainbow' 彩虹效果
 * - null 关闭效果
 *
 * 使用方法:
 *   修改 cursorConfig.type 为上述任意值即可切换效果
 *   设为 null 则使用系统默认 cursor
 */
import type { TrailingCursorOptions, BubbleCursorOptions, SnowflakeCursorOptions, EmojiCursorOptions, GhostCursorOptions, FollowingDotCursorOptions, FairyDustCursorOptions, RainbowCursorOptions } from 'cursor-effects';

export type CursorType = 'trailing' | 'bubble' | 'snowflake' | 'emoji' | 'ghost' | 'followingDot' | 'fairyDust' | 'rainbow' | null;

export interface CursorOptions {
  trailing?: TrailingCursorOptions;
  bubble?: BubbleCursorOptions;
  snowflake?: SnowflakeCursorOptions;
  emoji?: EmojiCursorOptions;
  ghost?: GhostCursorOptions;
  followingDot?: FollowingDotCursorOptions;
  fairyDust?: FairyDustCursorOptions;
  rainbow?: RainbowCursorOptions;
}

export const cursorConfig = {
  // 当前使用的 cursor 效果类型
  // 设为 null 则使用系统默认 cursor
  type: 'fairyDust' as CursorType,

  // 效果参数 (可选)
  options: {
    emoji: {
      delay: 20,
    } as EmojiCursorOptions,
    trailing: {
      particles: 20,
      rate: 10,
    } as TrailingCursorOptions,
  } as CursorOptions,
};