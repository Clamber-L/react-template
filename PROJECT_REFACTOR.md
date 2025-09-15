# 项目重构说明

本文档记录了项目结构的重新组织和优化。

## 📁 新的项目结构

### 重构前后对比

#### 重构前的问题：
- 组件分散在单一目录中，缺乏分类
- `lib`、`utils`、`constants`、`data` 等功能相似的目录分散
- 导入路径复杂，维护困难
- 缺乏统一的导出文件

#### 重构后的结构：

```
src/
├── api/                    # API 接口层
│   ├── authApi.ts         # 认证相关 API
│   ├── routeApi.ts        # 路由相关 API
│   └── userApi.ts         # 用户相关 API
├── components/             # 组件层（按功能分类）
│   ├── auth/              # 认证相关组件
│   │   └── AuthGuard.tsx
│   ├── demo/              # 演示组件
│   │   ├── AntdDemo.tsx
│   │   ├── AntdFallback.tsx
│   │   └── SimpleAntdDemo.tsx
│   ├── layout/            # 布局组件
│   │   ├── AppHeader.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── DynamicRouter.tsx
│   │   └── Sidebar.tsx
│   ├── ui/                # 通用UI组件
│   │   └── WorkInProgressPage.tsx
│   └── index.ts           # 统一导出文件
├── config/                # 配置文件（整合）
│   ├── theme/
│   │   └── antdTheme.ts   # 主题配置
│   ├── mockRoutes.ts      # 路由数据
│   ├── routes.ts          # 路由常量
│   └── index.ts           # 统一导出文件
├── lib/                   # 核心工具库（整合）
│   ├── hooks/             # 自定义 Hooks
│   │   └── useApi.ts
│   ├── componentMap.ts    # 组件映射
│   ├── error.ts          # 错误处理
│   ├── request.ts        # 请求封装
│   ├── status.ts         # 状态管理
│   ├── types.ts          # 通用类型
│   └── index.ts          # 统一导出文件
├── pages/                 # 页面组件
├── providers/             # Context Providers
├── stores/                # 状态管理
├── style/                 # 全局样式
└── types/                 # 类型定义
```

## 🔄 重构内容

### 1. 组件重新分类
- **layout/**: 布局相关组件（Header, Sidebar, Breadcrumb, Router）
- **auth/**: 认证相关组件（AuthGuard）
- **demo/**: 演示组件（AntdDemo, SimpleAntdDemo 等）
- **ui/**: 通用UI组件（WorkInProgressPage 等）

### 2. 配置文件整合
- 将 `constants/`, `data/` 目录合并到 `config/`
- 按功能分类：主题配置、路由配置等
- 提供统一的导出接口

### 3. 工具库整合
- 将 `utils/` 目录内容合并到 `lib/`
- 按功能分类：hooks、工具函数等
- 统一模块导出

### 4. 导入路径优化
- 创建了统一的 `index.ts` 导出文件
- 简化了组件间的导入路径
- 提高了代码的可维护性

## 📦 统一导出文件

### components/index.ts
```typescript
// Layout Components
export { default as AppHeader } from './layout/AppHeader';
export { default as Sidebar } from './layout/Sidebar';
// ... 其他组件
```

### config/index.ts
```typescript
// Theme configuration
export * from './theme/antdTheme';
// Routes and constants
export * from './routes';
export * from './mockRoutes';
```

### lib/index.ts
```typescript
// API utilities
export * from './error';
export * from './request';
// ... 其他工具
```

## 🎯 重构效果

### 优势：
1. **清晰的目录结构**: 按功能分类，便于查找和维护
2. **简化的导入路径**: 通过统一导出文件简化导入
3. **更好的可扩展性**: 新增组件有明确的归属目录
4. **减少代码重复**: 统一的配置和工具函数管理
5. **提高开发效率**: 更直观的项目结构

### 兼容性：
- 所有现有功能保持不变
- 导入路径已更新，确保正常运行
- 保持了原有的组件 API

## 📝 使用建议

### 新增组件时：
1. **布局组件** → `components/layout/`
2. **认证组件** → `components/auth/`
3. **演示组件** → `components/demo/`
4. **通用UI** → `components/ui/`

### 新增配置时：
- 路由相关 → `config/routes.ts` 或 `config/mockRoutes.ts`
- 主题相关 → `config/theme/`
- 其他配置 → `config/` 目录下新建文件

### 新增工具函数时：
- Hooks → `lib/hooks/`
- 工具函数 → `lib/` 目录下相应文件
- 记得在 `lib/index.ts` 中导出

## 🚀 下一步建议

1. **添加单元测试**: 为重构后的组件添加测试用例
2. **文档完善**: 为新的目录结构编写详细文档
3. **代码检查**: 运行 lint 确保所有导入路径正确
4. **性能优化**: 利用新结构进行代码分割优化