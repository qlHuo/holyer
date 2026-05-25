# Personal Homepage

Vue3 + TypeScript + TailwindCSS 个人主页项目

## 技术栈

- Vue 3 (Composition API)
- TypeScript
- TailwindCSS v4
- Vite

## 项目结构

```
src/
├── components/       # Vue 组件
│   ├── HeroSection.vue
│   ├── QuoteCard.vue
│   ├── TimeWeatherCard.vue
│   ├── WebsiteList.vue
│   ├── SocialLinks.vue
│   └── FooterSection.vue
├── data/            # 配置数据
│   ├── websites.ts
│   └── socials.ts
├── types/           # TypeScript 类型
│   └── index.ts
├── App.vue
├── main.ts
└── style.css
```

## 设计风格

- Apple 风格极简主义
- 毛玻璃效果卡片
- 浅色背景 + Bing 每日一图
- 颜色: 浅灰白背景, Apple Blue 强调色

## 命令

```bash
npm run dev    # 开发服务器
npm run build  # 生产构建
npm run preview # 预览构建
```

## 自定义

- 个人信息: `src/App.vue` 的 `personInfo` 对象
- 网站列表: `src/data/websites.ts`
- 社交链接: `src/data/socials.ts`

## API

- 背景图: https://60s.holyer.site/v2/bing (每日缓存)
- 每日一言: https://60s.holyer.site/v2/hitokoto
- 天气: https://60s.holyer.site/v2/weather?query=杭州

## 特性

- 响应式布局 (移动端/桌面端)
- 毛玻璃效果卡片
- 背景图片每日缓存
- 实时时间更新