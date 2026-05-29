# Personal Homepage

Vue3 + TypeScript + TailwindCSS 个人主页

## 预览

Apple 风格极简主义个人主页，支持响应式布局，实时时间天气展示，网站导航等功能。

## 特性

- Apple 风格毛玻璃效果卡片
- 实时时间 + 农历日期
- 天气信息展示
- 每日一言
- 社交链接
- 网站导航
- 响应式布局 (移动端/桌面端)
- 每日 Bing 背景图

## 技术栈

- Vue 3 (Composition API)
- TypeScript
- TailwindCSS v4
- Vite

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

## 自定义配置

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

| 功能 | API |
|---------|-----|
| 背景图 | `https://60s.holyer.site/v2/bing` |
| 每日一言 | `https://60s.holyer.site/v2/hitokoto` |
| 天气 | `https://60s.holyer.site/v2/weather?query=杭州` |
| 农历 | `https://60s.holyer.site/v2/lunar` |
| 图标 | `https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/` |

## 项目结构

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

## 代码风格

本项目通过 **ESLint + Prettier + VSCode** 三者协作实现保存时自动格式化。

### 协作流程

```
保存文件
  │
  ├─1─→ Prettier 格式化（分号、引号、缩进、尾逗号等）
  │
  └─2─→ ESLint 自动修复（代码质量规则，如 no-console、vue 规则等）
```

### 各工具职责

| 工具 | 职责 | 配置文件 |
|------|------|----------|
| **Prettier** | 代码格式（分号、引号、缩进、换行宽度等） | `.prettierrc` |
| **ESLint** | 代码质量（未使用变量、vue 规范、console 警告等） | `eslint.config.mjs` |
| **VSCode** | 编辑器行为（保存时触发格式化、指定格式化工具） | `.vscode/settings.json` |

### Prettier 配置 (`.prettierrc`)

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `semi` | `true` | 语句末尾添加分号 |
| `singleQuote` | `true` | 使用单引号 |
| `tabWidth` | `2` | 缩进为 2 个空格 |
| `trailingComma` | `es5` | ES5 兼容的尾逗号 |
| `printWidth` | `100` | 每行最大 100 字符 |
| `arrowParens` | `always` | 箭头函数参数始终加括号 |

### ESLint 配置 (`eslint.config.mjs`)

- 使用 `typescript-eslint` 解析 `.ts` 和 `.vue` 文件
- 继承 `eslint-plugin-vue` Flat 推荐规则（`vue/multi-word-component-names` 已关闭）
- TypeScript 文件启用 `no-console` 和 `no-debugger` 警告
- 通过 `eslint-config-prettier` 关闭与 Prettier 冲突的规则

### VSCode 配置 (`.vscode/settings.json`)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

| 配置项 | 说明 |
|--------|------|
| `editor.formatOnSave` | 保存时自动格式化 |
| `editor.defaultFormatter` | 默认格式化工具为 Prettier |
| `source.fixAll.eslint` | 保存时自动运行 ESLint 修复 |

### 推荐 VSCode 插件 (`.vscode/extensions.json`)

- **Vue.volar** — Vue 3 语言支持
- **dbaeumer.vscode-eslint** — ESLint 集成
- **esbenp.prettier-vscode** — Prettier 集成

### 最终效果

保存文件时，编辑器自动执行：

1. **Prettier 格式化** — 自动添加分号、统一单引号、修正缩进、折行等
2. **ESLint 修复** — 自动修复可修复的 lint 问题（如 Vue 组件规范），不可自动修复的（如 `console` 使用）以警告形式提示

### 命令行

```bash
npm run lint    # ESLint 检查
npm run format  # Prettier 格式化
```

## 许可证

MIT