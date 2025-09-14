# React 网络请求系统

基于 **Axios + Zustand** 的完整网络请求解决方案，复刻了 Vue Art Design Pro 项目的网络请求功能。

## 🚀 特性

- ✅ **智能缓存** - 自动缓存请求结果，减少重复请求
- ✅ **自动重试** - 网络错误时自动重试机制
- ✅ **分页支持** - 内置分页逻辑，简化列表开发
- ✅ **错误处理** - 完善的错误处理和用户提示
- ✅ **认证管理** - 自动Token管理和刷新机制
- ✅ **状态管理** - 基于Zustand的请求状态管理
- ✅ **TypeScript** - 完整的类型定义支持
- ✅ **取消请求** - 支持请求取消，避免内存泄漏

## 📁 文件结构

```
src/
├── lib/
│   ├── types.ts          # 类型定义
│   ├── status.ts         # 状态码定义
│   ├── error.ts          # 错误处理
│   ├── request.ts        # 主要请求模块
│   └── useApi.ts         # React Hooks
├── api/
│   └── userApi.ts        # API服务示例
└── components/
    └── NetworkDemo.tsx   # 演示组件
```

## 🎯 核心模块

### 1. 请求配置 (request.ts)

基于 Axios 的封装，提供：
- 请求/响应拦截器
- 自动Token管理
- 错误处理
- 请求重试
- 防抖机制

### 2. React Hooks (useApi.ts)

提供三个主要Hook：
- `useApi` - 通用API请求
- `usePagination` - 分页数据
- `useSubmit` - 表单提交

### 3. 错误处理 (error.ts)

- 自定义HttpError类
- 统一错误处理
- 可配置错误显示

## 🔧 基础使用

### 1. 简单GET请求

```tsx
import { useApi } from '../lib/useApi';

function UserProfile() {
  const { data, loading, error, refresh } = useApi<User>(
    {
      url: '/user/profile',
      method: 'GET',
    },
    {
      immediate: true,
      cacheTime: 5 * 60 * 1000, // 5分钟缓存
    }
  );

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  if (!data) return <div>暂无数据</div>;

  return (
    <div>
      <h1>{data.username}</h1>
      <p>{data.email}</p>
      <button onClick={() => refresh()}>刷新</button>
    </div>
  );
}
```

### 2. 分页列表

```tsx
import { usePagination } from '../lib/useApi';

function UserList() {
  const {
    data: users,
    total,
    page,
    pageSize,
    loading,
    changePage,
    changePageSize,
  } = usePagination<User>(
    (params) => ({
      url: '/users',
      method: 'GET',
      params,
    }),
    {
      defaultPageSize: 10,
      immediate: true,
    }
  );

  return (
    <div>
      {loading && <div>加载中...</div>}
      
      {users.map(user => (
        <div key={user.id}>{user.username}</div>
      ))}
      
      <div>
        <button 
          disabled={page <= 1}
          onClick={() => changePage(page - 1)}
        >
          上一页
        </button>
        
        <span>第 {page} 页，共 {total} 条</span>
        
        <button 
          disabled={page >= Math.ceil(total / pageSize)}
          onClick={() => changePage(page + 1)}
        >
          下一页
        </button>
      </div>
    </div>
  );
}
```

### 3. 表单提交

```tsx
import { useSubmit } from '../lib/useApi';

function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  
  const { submit, submitting, error } = useSubmit<LoginResponse, LoginParams>(
    (data) => ({
      url: '/auth/login',
      method: 'POST',
      data,
    }),
    {
      onSuccess: (response) => {
        console.log('登录成功:', response);
        // 处理登录成功逻辑
      },
      onError: (error) => {
        console.error('登录失败:', error);
      },
    }
  );

  const handleSubmit = async () => {
    try {
      await submit(formData);
    } catch (error) {
      // 错误已在onError中处理
    }
  };

  return (
    <form>
      <input
        value={formData.username}
        onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
        placeholder="用户名"
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
        placeholder="密码"
      />
      
      {error && <div className="error">{error}</div>}
      
      <button 
        type="button" 
        onClick={handleSubmit} 
        disabled={submitting}
      >
        {submitting ? '登录中...' : '登录'}
      </button>
    </form>
  );
}
```

## 🛠️ 高级配置

### 1. 自定义错误处理

```tsx
import { setErrorHandler } from '../lib/error';

// 在应用启动时设置全局错误处理
setErrorHandler((message, error) => {
  // 集成到你的通知系统
  toast.error(message);
  
  // 发送错误日志到监控系统
  if (error) {
    analytics.track('api_error', error.toLogData());
  }
});
```

### 2. Token管理

```tsx
import { tokenManager, setLogoutCallback } from '../lib/request';

// 设置登录成功后的token
tokenManager.setToken('your-access-token', 'your-refresh-token');

// 设置退出登录回调
setLogoutCallback(() => {
  // 清除用户数据
  userStore.clearUser();
  // 跳转到登录页
  router.push('/login');
});

// 获取当前token
const currentToken = tokenManager.getToken();

// 清除token
tokenManager.clearTokens();
```

### 3. 环境变量配置

在你的 `.env` 文件中配置：

```env
# API基础URL
REACT_APP_API_URL=https://api.example.com

# 是否携带凭证
REACT_APP_WITH_CREDENTIALS=true
```

### 4. API服务定义

```tsx
// api/userApi.ts
import api from '../lib/request';

export const userApi = {
  // 获取用户列表
  getUserList: (params: UserQueryParams) => {
    return api.get<PageResponse<User>>({
      url: '/users',
      params,
    });
  },

  // 创建用户
  createUser: (data: CreateUserParams) => {
    return api.post<User>({
      url: '/users',
      data,
    });
  },

  // 上传文件
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return api.post<{ url: string }>({
      url: '/upload',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
```

## 🔍 Hook详细说明

### useApi Hook

```tsx
const {
  data,           // 响应数据
  loading,        // 加载状态
  error,          // 错误信息
  execute,        // 手动执行请求
  refresh,        // 刷新数据（清除缓存后重新请求）
  clearCache,     // 清除缓存
} = useApi(config, options);
```

**配置选项：**
- `immediate`: 是否立即执行（默认false）
- `cacheTime`: 缓存时间（毫秒，默认5分钟）
- `showErrorMessage`: 是否显示错误消息（默认true）
- `onSuccess`: 成功回调
- `onError`: 错误回调
- `retryCount`: 重试次数（默认0）
- `retryDelay`: 重试间隔（毫秒，默认1000）

### usePagination Hook

```tsx
const {
  data,           // 当前页数据
  total,          // 总条数
  page,           // 当前页码
  pageSize,       // 每页条数
  totalPages,     // 总页数
  loading,        // 加载状态
  error,          // 错误信息
  changePage,     // 切换页码
  changePageSize, // 切换每页条数
  resetPagination,// 重置分页
  refresh,        // 刷新数据
} = usePagination(config, options);
```

### useSubmit Hook

```tsx
const {
  submit,         // 提交函数
  submitting,     // 提交状态
  error,          // 错误信息
} = useSubmit(config, options);
```

## 🎭 错误处理

### HTTP状态码处理

系统自动处理常见的HTTP状态码：
- `401` - 自动清除token并跳转登录
- `403` - 权限不足提示
- `404` - 资源不存在
- `500` - 服务器错误
- `timeout` - 请求超时自动重试

### 业务错误处理

```tsx
// 响应格式
interface ApiResponse<T> {
  code: number;     // 业务状态码
  message: string;  // 错误信息
  data: T;         // 响应数据
}

// 成功：code = 200 或 0
// 失败：根据code显示对应错误信息
```

## 🚀 最佳实践

### 1. API组织

按模块组织API服务：

```
api/
├── userApi.ts      # 用户相关
├── productApi.ts   # 产品相关
├── orderApi.ts     # 订单相关
└── index.ts        # 统一导出
```

### 2. 类型定义

为所有API定义TypeScript类型：

```tsx
// types/user.ts
export interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
}

export interface CreateUserParams {
  username: string;
  email: string;
  password: string;
}
```

### 3. 错误边界

使用React Error Boundary处理组件错误：

```tsx
class ApiErrorBoundary extends React.Component {
  componentDidCatch(error: Error) {
    if (isHttpError(error)) {
      // 处理API错误
      console.error('API Error:', error.toLogData());
    }
  }
}
```

### 4. 性能优化

- 合理设置缓存时间
- 使用防抖避免频繁请求
- 取消无用的请求
- 分页加载大数据集

## 🌟 与Vue版本对比

| 功能 | Vue版本 | React版本 |
|------|---------|----------|
| 基础请求 | ✅ Axios | ✅ Axios |
| 错误处理 | ✅ ElMessage | ✅ 可配置 |
| Token管理 | ✅ Pinia | ✅ 内置管理器 |
| 请求重试 | ✅ | ✅ |
| 缓存机制 | ❌ | ✅ 内置缓存 |
| 分页支持 | ❌ | ✅ 专用Hook |
| 状态管理 | ✅ Pinia | ✅ Zustand |
| TypeScript | ✅ | ✅ |

React版本在原有功能基础上，增加了缓存机制和专用的分页Hook，使用更加便捷！

---

🎉 **现在您可以在React项目中享受与Vue Art Design Pro一样强大的网络请求功能了！**