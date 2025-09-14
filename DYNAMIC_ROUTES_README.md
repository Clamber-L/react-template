# 动态路由系统文档

## 概述

本项目已经成功实现了动态路由系统，将硬编码的路由配置改为从数据库动态获取。这使得您可以在不修改代码的情况下，通过数据库配置来控制应用的路由结构。

## 核心特性

### 1. 数据库驱动
- 路由配置存储在数据库中
- 支持动态增删改查路由
- 支持路由的启用/禁用状态控制

### 2. 权限控制
- 基于用户角色的路由访问控制
- 支持细粒度的权限配置
- 自动过滤用户无权访问的路由

### 3. 组件映射
- 通过字符串名称动态加载组件
- 支持懒加载和代码分割
- 错误处理和回退机制

### 4. 嵌套路由
- 支持多层级嵌套路由
- 支持路由重定向
- 布局组件和子路由的组合

## 文件结构

```
src/
├── types/route.ts              # 路由类型定义
├── api/routeApi.ts            # 路由API接口
├── utils/componentMap.ts      # 组件映射表
├── components/DynamicRouter.tsx # 动态路由生成器
├── data/mockRoutes.ts         # 模拟数据（用于演示）
└── App.tsx                    # 应用入口（已修改）
```

## 使用方法

### 1. 路由配置数据结构

```typescript
interface DynamicRoute {
    id: string;                    // 路由唯一标识
    path: string;                  // 路由路径
    component: string;             // 组件名称
    name: string;                  // 路由名称
    meta: RouteMeta;              // 元信息
    children?: DynamicRoute[];     // 子路由
    enabled: boolean;              // 是否启用
    createTime: string;           // 创建时间
    updateTime: string;           // 更新时间
}

interface RouteMeta {
    title: string;                // 页面标题
    icon?: string;               // 图标
    keepAlive?: boolean;         // 是否缓存
    roles?: string[];            // 所需权限角色
    hideInMenu?: boolean;        // 是否在菜单中隐藏
    hideInTab?: boolean;         // 是否在标签页中隐藏
    requireAuth?: boolean;       // 是否需要认证
    redirect?: string;           // 重定向路径
}
```

### 2. 添加新组件

要添加新的页面组件，需要在 `src/utils/componentMap.ts` 中注册：

```typescript
import NewComponent from '@/pages/NewComponent';

export const componentMap: ComponentMap = {
    // 现有组件...
    'NewComponent': NewComponent,
};
```

### 3. 数据库路由配置示例

```json
{
    "id": "user-management",
    "path": "/system/users",
    "component": "UserManagement",
    "name": "UserManagement",
    "enabled": true,
    "meta": {
        "title": "用户管理",
        "icon": "UserOutlined",
        "requireAuth": true,
        "roles": ["admin"]
    }
}
```

### 4. API 接口

系统提供以下API接口：

- `GET /system/routes/user` - 获取用户可访问的路由
- `GET /system/routes` - 获取所有路由配置
- `POST /system/routes` - 创建新路由
- `PUT /system/routes/:id` - 更新路由配置
- `DELETE /system/routes/:id` - 删除路由

## 当前实现状态

### ✅ 已完成
1. 动态路由类型定义
2. 路由API接口定义
3. 组件映射系统
4. 动态路由生成器
5. 权限控制集成
6. 模拟数据演示

### 🔄 当前使用模拟数据
为了演示功能，当前系统使用 `src/data/mockRoutes.ts` 中的模拟数据。在生产环境中，需要：

1. 实现真实的后端API
2. 连接到数据库
3. 移除模拟数据的使用

### 🚀 切换到真实API

要切换到真实的API，只需在 `DynamicRouter.tsx` 中：

```typescript
// 替换当前的模拟数据逻辑
// const [routeConfig, setRouteConfig] = useState<RouteConfigResponse | null>(null);

// 使用真实的API
const { data: routeConfig, loading, error, execute } = useApi<RouteConfigResponse>(
    {
        url: '/system/routes/user',
        method: 'GET',
        params: { roles: userRoles.join(',') },
    },
    {
        immediate: true,
        cacheTime: 10 * 60 * 1000,
    },
);
```

## 优势

1. **灵活性**：无需重新部署即可修改路由结构
2. **权限控制**：细粒度的访问控制
3. **维护性**：集中管理路由配置
4. **扩展性**：易于添加新页面和功能
5. **性能**：支持缓存和懒加载

## 注意事项

1. 确保数据库中的组件名在 `componentMap` 中有对应的映射
2. 路由路径应该唯一，避免冲突
3. 权限角色配置需要与用户系统保持一致
4. 考虑路由缓存策略以提高性能

## 演示

当前系统已经启动并运行在 http://localhost:3001，您可以通过预览浏览器访问来查看动态路由的效果。

### 🎯 快速体验

1. **访问应用**：打开预览浏览器或直接访问 http://localhost:3001
2. **登录状态**：系统默认已登录状态（演示用途），用户具有admin权限
3. **查看动态路由演示**：导航到 "仪表板 > 动态路由演示" 页面
4. **测试功能**：
   - 使用左侧菜单浏览不同页面
   - 点击登出按钮测试路由重定向
   - 观察URL变化和权限控制

### 🔄 问题解决

如果遇到404错误，这是因为：
1. **已修复**：添加了根路径重定向逻辑
2. **已修复**：添加了登录状态检查
3. **已修复**：优化了路由生成顺序

现在访问 localhost:3001 会：
- 未登录用户 → 自动跳转到登录页
- 已登录用户 → 自动跳转到工作台首页

### 🎨 新增功能

- **专门的演示页面**：`/dashboard/demo` 展示动态路由系统的完整功能说明
- **用户友好的界面**：详细展示当前用户权限和系统工作原理
- **交互式测试**：提供登出、刷新等测试按钮