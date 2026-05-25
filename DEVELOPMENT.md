# Personal Homepage 开发文档

## 项目初始化

### 技术栈
- Vue 3 (Composition API)
- TypeScript
- TailwindCSS v4
- Vite

### 项目创建
```bash
npm create vite@latest personal-homepage -- --template vue-ts
cd personal-homepage
npm install
npm install -D tailwindcss @tailwindcss/vite
```

### TailwindCSS v4 配置
`vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

`style.css`:
```css
@import "tailwindcss";
```

## 页面功能开发

### 布局结构
- **桌面端三列布局**: 用户信息 | 时间天气+一言 | 网站导航
- **移动端堆叠布局**: 自动切换为垂直堆叠
- 容器高度: `h-90` (360px)
- 容器宽度: 第一列 `w-72`，第二列 `w-96`，第三列 `w-96`

### 组件说明

#### 1. HeroSection.vue - 用户基础信息卡片
- 显示: 头像、姓名、职称、座右铭、社交链接
- 布局: `flex flex-col justify-between`
- 高度: `h-full` 撑满容器

#### 2. TimeWeatherCard.vue - 时间和天气卡片
- 实时时间更新 (每秒更新)
- 显示: 当前时间、年月日+星期、农历日期
- 天气: 温度、天气状况、图标、位置
- 布局: 左右结构，标题在顶部，内容垂直居中
- API:
  - `https://60s.holyer.site/v2/weather?query=杭州`
  - `https://60s.holyer.site/v2/lunar`

#### 3. QuoteCard.vue - 每日一言卡片
- 调用一言 API 获取随机语录
- 布局: `flex flex-col justify-between`
- 内容: 语录文本 + 来源

#### 4. WebsiteList.vue - 网站导航卡片
- 网格布局: `grid-cols-2`
- 分页轮播: 每页6个
- 支持图片 URL 图标，加载失败显示默认图标 🌐

#### 5. SocialLinks.vue - 社交链接
- 水平排列图标
- 支持图片 URL 图标，加载失败显示默认图标 🔗

#### 6. IconImage.vue - 图片图标组件
- 统一处理图片加载失败降级
- Props: `src`, `alt`, `fallback`, `size`
- 加载失败时显示 fallback emoji

### 数据配置

#### personInfo.ts - 个人信息
```ts
export const personInfo = {
  name: 'Holyer',
  title: '古法前端攻城狮',
  motto: '代码改变世界',
  avatar: 'https://avatars.githubusercontent.com/u/49195759?v=4&size=64',
};
```

#### websites.ts - 网站导航数据
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

#### socials.ts - 社交链接数据
```ts
export const socials: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/qlhuo',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/github.svg',
  },
  {
    name: 'QQ',
    url: 'http://wpa.qq.com/msgrd?v=3&uin=1322346367&site=qq&menu=yes',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/qq.svg',
  },
  // ...
];
```

### API 接口

| 功能 | API |
|------|-----|
| 背景图 | `https://60s.holyer.site/v2/bing` |
| 每日一言 | `https://60s.holyer.site/v2/hitokoto` |
| 天气 | `https://60s.holyer.site/v2/weather?query=杭州` |
| 农历 | `https://60s.holyer.site/v2/lunar` |
| 图标CDN | `https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/` |

## 设计规范

### 样式约定
- 标题统一: `text-sm font-medium text-text-muted text-center tracking-wider`
- 卡片统一: `glass-card` 毛玻璃效果类
- 图标大小: 网站导航 `w-8 h-8`，社交链接 `w-6 h-6`

### 颜色系统
```css
--color-text: #333;        /* 主文本 */
--color-text-muted: #666;  /* 次要文本 */
--color-accent: #007AFF;   /* 强调色 Apple Blue */
--color-border: #e5e5e5;   /* 边框 */
```

### 毛玻璃效果
```css
.glass-card {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}
```

## VibeCoding 开发思路

### 核心原则
1. **快速迭代**: 不追求一步到位，先实现再优化
2. **增量修改**: 每次只改一个小功能，及时验证
3. **即时反馈**: 每次修改后运行 `npm run build` 验证
4. **用户驱动**: 根据用户反馈调整样式和功能

### 开发流程
1. 用户提出需求 → 分析可行性
2. 小步修改 → 立即构建验证
3. 用户视觉反馈 → 调整样式
4. 重复直到满意

### 关键技巧
- 使用 `flex-1` 和 `justify-between` 实现内容平均分布
- 使用 `items-stretch` 让左右区域等高
- 使用 `shrink-0` 防止内容被压缩
- 图片加载失败用 `@error` 事件降级处理

## 命令

```bash
npm run dev      # 开发服务器
npm run build    # 生产构建
npm run preview  # 预览构建
```

## 文件结构

```
src/
├── components/
│   ├── HeroSection.vue
│   ├── TimeWeatherCard.vue
│   ├── QuoteCard.vue
│   ├── WebsiteList.vue
│   ├── SocialLinks.vue
│   ├── FooterSection.vue
│   └── IconImage.vue
├── data/
│   ├── personInfo.ts
│   ├── websites.ts
│   └── socials.ts
├── types/
│   └── index.ts
├── App.vue
├── main.ts
└── style.css
```