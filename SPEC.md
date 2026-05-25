# Personal Homepage - 规格文档 (v2)

## 1. 项目概述

- **项目名称**: personal-homepage
- **项目类型**: Vue3 单页应用 (SPA)
- **核心功能**: 响应式个人主页，展示个人座右铭、每日一言、时间、天气和个人作品
- **目标用户**: 个人博主、开发者展示个人简历/作品集

## 2. 技术栈

- Vue 3 (Composition API)
- TypeScript
- TailwindCSS v4
- Vite (构建工具)

## 3. 视觉与布局

### 3.1 设计语言
- **美学风格**: Apple 风格极简主义，毛玻璃效果，大量留白
- **配色方案**:
  - 主色: `#f5f5f7` (浅灰白 - 背景)
  - 卡片: `rgba(255, 255, 255, 0.72)` (毛玻璃)
  - 强调色: `#0071e3` (Apple Blue)
  - 文字: `#1d1d1f` (深灰)
  - 次要文字: `#86868b` (灰色)
- **字体**: Noto Sans SC + system-ui
- **动效**: 入场 fade-in (400ms ease-out)，hover 微浮动

### 3.2 布局结构
```
┌──────────────────────────────────────┐
│  背景图片 (Bing 每日一图)              │
│  ┌────────────────────────────────┐  │
│  │  Hero Section                  │  │
│  │  头像 + 姓名 + 座右铭           │  │
│  ├────────────────────────────────┤  │
│  │  每日一言                       │  │
│  ├────────────────────────────────┤  │
│  │  时间 + 天气卡片                 │  │
│  ├────────────────────────────────┤  │
│  │  个人作品 (2/3/4列)             │  │
│  └────────────────────────────────┤  │
│  │  Footer (固定底部)              │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

### 3.3 响应式断点
- Mobile: < 640px (双列布局)
- Tablet: 640px - 1024px (三列布局)
- Desktop: > 1024px (四列布局)

## 4. 功能与交互

### 4.1 背景图片
- 来源: https://60s.holyer.site/v2/bing
- 缓存策略: 每天调用一次，缓存到 localStorage
- 缓存 Key 格式: `bing_bg_YYYY-M-D`

### 4.2 Hero Section
- 显示圆形头像 (本地或 DiceBear API)
- 显示姓名和职位
- 个人座右铭
- 社交媒体图标链接

### 4.3 每日一言
- 来源: https://60s.holyer.site/v2/hitokoto
- 显示句子内容 + 作者/出处
- 页面加载时自动获取

### 4.4 时间与天气
- **实时时间**: 每秒更新，格式 `HH:mm:ss`
- **天气**: 来源 https://60s.holyer.site/v2/weather?query=杭州
- 显示温度、天气图标、位置

### 4.5 个人作品
- 毛玻璃卡片布局
- 响应式网格 (2/3/4列)

### 4.6 Footer
- 固定在页面底部
- 版权信息

## 5. API 接口

| 功能 | 接口 | 说明 |
|------|------|------|
| 背景图 | https://60s.holyer.site/v2/bing | 返回 `{ url: string }` |
| 每日一言 | https://60s.holyer.site/v2/hitokoto | 返回 `{ hitokoto, from }` |
| 天气 | https://60s.holyer.site/v2/weather?query=杭州 | 返回和风天气 JSON |

## 6. 组件列表

1. `App.vue` - 根组件，背景图片管理
2. `HeroSection.vue` - 头部区域
3. `QuoteCard.vue` - 每日一言
4. `TimeWeatherCard.vue` - 时间和天气
5. `WebsiteList.vue` - 个人作品列表
6. `FooterSection.vue` - 底部
7. `SocialLinks.vue` - 社交链接

## 7. 配置文件

- `src/data/websites.ts` - 网站列表配置
- `src/data/socials.ts` - 社交链接配置