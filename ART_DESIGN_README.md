# Art Design Pro 配色系统 - React + Tailwind CSS

本项目完美复刻了 Vue3 Art Design Pro 项目的配色方案，并在 React + Tailwind CSS 环境中实现。

## 🎨 特性

- ✅ 完整复刻 Art Design Pro 配色方案
- ✅ 支持亮色/暗色主题切换
- ✅ 与 Tailwind CSS 完美集成
- ✅ TypeScript 完整类型支持
- ✅ 响应式设计适配
- ✅ 可复用的 React 组件

## 🚀 快速开始

### 1. 启动项目

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 2. 基础使用

```tsx
import { useTheme } from './lib/useTheme';
import { Card, Button, Badge } from './components/ArtComponents';

function MyComponent() {
  const { theme, toggleTheme, isDark } = useTheme();
  
  return (
    <Card title="示例卡片">
      <div className="space-y-4">
        <Button variant="primary">主要按钮</Button>
        <Badge variant="success">成功徽章</Badge>
        <button onClick={toggleTheme}>
          切换到{isDark ? '亮色' : '暗色'}主题
        </button>
      </div>
    </Card>
  );
}
```

## 🎯 配色方案

### 主题色

| 颜色名称 | 亮色值 | CSS 变量 | Tailwind 类 |
|---------|--------|----------|-------------|
| Primary | `rgb(93 135 255)` | `--art-primary` | `text-art-primary` `bg-art-primary` |
| Secondary | `rgb(73 190 255)` | `--art-secondary` | `text-art-secondary` `bg-art-secondary` |
| Success | `rgb(19 222 185)` | `--art-success` | `text-art-success` `bg-art-success` |
| Warning | `rgb(255 174 31)` | `--art-warning` | `text-art-warning` `bg-art-warning` |
| Error | `rgb(250 137 107)` | `--art-error` | `text-art-error` `bg-art-error` |
| Info | `rgb(107 125 155)` | `--art-info` | `text-art-info` `bg-art-info` |

### 灰度色系 (亮色主题)

| 级别 | 颜色值 | 用途 |
|------|--------|------|
| Gray 100 | `rgb(249 249 249)` | 最浅背景 |
| Gray 200 | `rgb(241 241 244)` | 浅背景 |
| Gray 300 | `rgb(219 223 233)` | 边框 |
| Gray 400 | `rgb(196 202 218)` | 禁用状态 |
| Gray 500 | `rgb(153 161 183)` | 辅助文字 |
| Gray 600 | `rgb(120 130 157)` | 次要文字 |
| Gray 700 | `rgb(75 86 117)` | 主要文字 |
| Gray 800 | `rgb(37 47 74)` | 标题文字 |
| Gray 900 | `rgb(7 20 55)` | 强调文字 |

### 灰度色系 (暗色主题)

| 级别 | 颜色值 | 用途 |
|------|--------|------|
| Dark Gray 100 | `rgb(27 28 34)` | 最深背景 |
| Dark Gray 200 | `rgb(38 39 47)` | 深背景 |
| Dark Gray 300 | `rgb(54 56 67)` | 边框 |
| Dark Gray 400 | `rgb(70 72 82)` | 禁用状态 |
| Dark Gray 500 | `rgb(99 102 116)` | 辅助文字 |
| Dark Gray 600 | `rgb(128 130 144)` | 次要文字 |
| Dark Gray 700 | `rgb(154 156 174)` | 主要文字 |
| Dark Gray 800 | `rgb(181 183 200)` | 标题文字 |
| Dark Gray 900 | `rgb(245 245 245)` | 强调文字 |

## 🧩 组件使用

### 主题切换

```tsx
import { ThemeToggle } from './components/ArtComponents';

<ThemeToggle />
```

### 卡片组件

```tsx
import { Card } from './components/ArtComponents';

<Card title="卡片标题" variant="shadow">
  卡片内容
</Card>
```

### 按钮组件

```tsx
import { Button } from './components/ArtComponents';

<Button variant="primary" size="lg" onClick={handleClick}>
  点击按钮
</Button>
```

### 输入框组件

```tsx
import { Input } from './components/ArtComponents';

<Input 
  label="用户名"
  placeholder="请输入用户名"
  value={username}
  onChange={setUsername}
  error={error}
/>
```

### 徽章组件

```tsx
import { Badge } from './components/ArtComponents';

<Badge variant="success" size="md">
  成功
</Badge>
```

## 🎨 Tailwind CSS 集成

### 自定义工具类

项目扩展了 Tailwind CSS，添加了 Art Design Pro 的配色：

```css
/* 主题背景色工具类 */
.bg-art-primary   /* Primary 主题背景 */
.bg-art-secondary /* Secondary 主题背景 */
.bg-art-success   /* Success 主题背景 */
.bg-art-warning   /* Warning 主题背景 */
.bg-art-error     /* Error 主题背景 */

/* 卡片样式 */
.art-card         /* 基础卡片样式 */
.art-card-shadow  /* 带阴影的卡片 */

/* 徽章样式 */
.art-badge        /* 通知徽章 */
```

### 响应式断点

项目定义了与 Art Design Pro 一致的响应式断点：

```javascript
screens: {
  phone: '500px',           // 手机
  'ipad-vertical': '900px', // iPad 竖屏
  ipad: '800px',           // iPad
  'ipad-pro': '1180px',    // iPad Pro
  notebook: '1600px',      // 笔记本
  // ... 其他标准断点
}
```

## 🎯 CSS 变量使用

可以直接使用 CSS 变量来获取主题色：

```css
.my-element {
  background-color: rgb(var(--art-primary));
  border-color: rgb(var(--art-gray-300-rgb) / 0.6);
  color: var(--art-text-gray-900);
}
```

## 🌓 主题切换 API

### useTheme Hook

```tsx
import { useTheme } from './lib/useTheme';

function MyComponent() {
  const { 
    theme,       // 'light' | 'dark'
    toggleTheme, // 切换主题函数
    setTheme,    // 设置主题函数
    isDark,      // 是否为暗色主题
    isLight      // 是否为亮色主题
  } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      当前主题: {theme}
    </button>
  );
}
```

### 主题工具函数

```tsx
import { themeUtils } from './lib/useTheme';

// 获取当前主题
const currentTheme = themeUtils.getCurrentTheme();

// 检查是否为暗色主题
const isDark = themeUtils.isDarkTheme();

// 获取 CSS 变量值
const primaryColor = themeUtils.getCSSVariable('--art-primary');

// 设置 CSS 变量
themeUtils.setCSSVariable('--custom-color', '#ff0000');
```

## 📱 移动端适配

项目包含了 Art Design Pro 的移动端适配样式：

```css
/* 移动端去除 cursor 样式 */
@media screen and (max-width: 500px) {
  * {
    cursor: default !important;
  }
}
```

## 🎭 特殊效果

### 色弱模式

```tsx
// 添加色弱模式类
<div className="color-weak">
  <!-- 内容会应用色弱模式滤镜 -->
</div>
```

### 呼吸动画

```tsx
// 徽章自带呼吸动画
<span className="art-badge" />

// 或手动应用
<div className="animate-breathe">
  呼吸动画效果
</div>
```

## 📂 文件结构

```
src/
├── components/
│   ├── ArtComponents.tsx      # 可复用组件
│   └── ArtDesignShowcase.tsx  # 展示页面
├── lib/
│   └── useTheme.ts           # 主题管理
├── style/
│   ├── art-theme.css         # 主题样式
│   └── index.css             # 样式入口
└── App.tsx                   # 应用入口
```

## 🔧 定制化

### 修改主题色

在 `tailwind.config.js` 中修改颜色值：

```javascript
colors: {
  'art-primary': 'rgb(你的主色值)',
  // ... 其他颜色
}
```

### 添加新的工具类

在 `tailwind.config.js` 的 plugins 中添加：

```javascript
plugins: [
  function ({ addUtilities, theme }) {
    const newUtilities = {
      '.my-custom-class': {
        // 你的样式
      },
    };
    addUtilities(newUtilities);
  },
]
```

## 🎉 效果预览

启动项目后，您可以看到：

1. **完整的配色展示** - 展示所有主题色和灰度色
2. **组件演示** - 按钮、卡片、表单、徽章等组件
3. **主题切换** - 一键切换亮色/暗色主题
4. **响应式布局** - 适配各种设备尺寸
5. **交互动效** - 悬停、点击等交互效果

这套配色系统完美复刻了 Art Design Pro 的视觉设计，为您的 React 项目提供专业、美观的 UI 体验！

---

🎨 **享受设计的乐趣，让代码更有美感！**