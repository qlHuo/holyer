# Personal Homepage

Vue3 + TypeScript + TailwindCSS 个人主页

## Preview

Apple 风格极简主义个人主页，支持响应式布局，实时时间天气展示，网站导航等功能。

## Features

- Apple 风格毛玻璃效果卡片
- 实时时间 + 农历日期
- 天气信息展示
- 每日一言
- 社交链接
- 网站导航
- 响应式布局 (移动端/桌面端)
- 每日 Bing 背景图

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- TailwindCSS v4
- Vite

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

### 个人信息

Edit `src/data/personInfo.ts`:

```ts
export const personInfo = {
  name: 'Your Name',
  title: '全栈开发者',
  motto: '代码改变世界',
  avatar: 'https://example.com/avatar.png',
};
```

### 社交链接

Edit `src/data/socials.ts`:

```ts
export const socials: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourname',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/github.svg',
  },
  {
    name: 'QQ',
    url: 'http://wpa.qq.com/msgrd?v=3&uin=YOUR_QQ&site=qq&menu=yes',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/qq.svg',
  },
  // ...
];
```

### 网站导航

Edit `src/data/websites.ts`:

```ts
export const websites: WebsiteItem[] = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    description: '代码托管平台',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/github.svg',
  },
  // ...
];
```

## API

| Feature | API |
|---------|-----|
| Background | `https://60s.holyer.site/v2/bing` |
| Quote | `https://60s.holyer.site/v2/hitokoto` |
| Weather | `https://60s.holyer.site/v2/weather?query=杭州` |
| Lunar | `https://60s.holyer.site/v2/lunar` |
| Icons | `https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/` |

## Project Structure

```
src/
├── components/       # Vue 组件
│   ├── HeroSection.vue
│   ├── TimeWeatherCard.vue
│   ├── QuoteCard.vue
│   ├── WebsiteList.vue
│   ├── SocialLinks.vue
│   ├── FooterSection.vue
│   └── IconImage.vue
├── data/            # 配置数据
│   ├── personInfo.ts
│   ├── websites.ts
│   └── socials.ts
├── types/           # TypeScript 类型
│   └── index.ts
├── App.vue
├── main.ts
└── style.css
```

## License

MIT