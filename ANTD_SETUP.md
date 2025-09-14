# Ant Design 配置指南

## 🎉 安装完成

Ant Design 已经成功添加到项目中！以下是完整的配置信息：

## 📦 已安装的依赖

```json
{
  "antd": "^5.27.2",
  "@ant-design/icons": "^6.0.0"
}
```

## 🛠️ 安装步骤

1. **安装依赖包**：
   ```bash
   npm install
   ```

2. **重启开发服务器**：
   ```bash
   npm run dev
   ```

## 🎨 主题配置

### 主题文件
- `src/config/antdTheme.ts` - Ant Design 主题配置
- `src/providers/ThemeProvider.tsx` - 主题提供者组件

### 配色方案
项目使用与Vue项目一致的Art Design Pro配色：

```typescript
const artColors = {
  primary: '#5d87ff',      // 主色
  secondary: '#49beff',    // 次要色
  success: '#13deb9',      // 成功色
  warning: '#ffae1f',      // 警告色
  error: '#fa896b',        // 错误色
  info: '#6b7d9b',         // 信息色
  danger: '#ff4d4f',       // 危险色
}
```

## 🔧 使用方法

### 1. 启用主题提供者

在 `src/main.tsx` 中包装应用：

```tsx
import { ThemeProvider } from './providers/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>,
);
```

### 2. 使用主题Hook

```tsx
import { useTheme } from '../providers/ThemeProvider';

const MyComponent = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <Switch checked={isDark} onChange={toggleTheme} />
  );
};
```

### 3. 使用Ant Design组件

```tsx
import { Button, Card, Table } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const MyComponent = () => {
  return (
    <Card title="示例卡片">
      <Button type="primary" icon={<UserOutlined />}>
        主要按钮
      </Button>
    </Card>
  );
};
```

## 📋 组件演示

完整的组件演示在 `src/components/AntdDemo.tsx` 中，包含：

- ✅ 表单组件 (Input, Select, DatePicker)
- ✅ 数据展示 (Table, Card, Tag)
- ✅ 反馈组件 (Modal, Message, Notification)
- ✅ 布局组件 (Row, Col, Space)
- ✅ 导航组件 (Button, Menu)
- ✅ 主题切换功能

## 🌟 特性

- 🎨 **与Vue项目配色一致** - 使用相同的Art Design Pro色彩
- 🌙 **明暗主题支持** - 自动检测系统偏好，支持手动切换
- 🌍 **国际化支持** - 内置中文语言包
- 📱 **响应式设计** - 适配不同设备尺寸
- 🔧 **TypeScript支持** - 完整的类型定义
- ⚡ **与Tailwind CSS兼容** - 可与现有样式系统共存

## 🚀 下一步

1. 运行 `npm install` 安装依赖
2. 查看 Ant Design 标签页查看完整演示
3. 开始构建您的UI界面！

## 📚 参考文档

- [Ant Design 官方文档](https://ant.design/)
- [Ant Design Icons](https://ant.design/components/icon/)
- [主题定制指南](https://ant.design/docs/react/customize-theme-cn)