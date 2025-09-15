import { Routes, Route, Navigate } from 'react-router-dom';

import { PublicRoute, DynamicRouter } from './components';
import { useAuth } from './stores/useAuthStore';
import { ROUTES } from './config';

// 页面组件
import Login from './pages/Login';

/**
 * 根路径重定向组件
 * 根据用户登录状态决定跳转到登录页还是首页
 */
const RootRedirect = () => {
    const { isLogin } = useAuth();

    console.log('🏠 RootRedirect: isLogin =', isLogin);

    if (isLogin) {
        console.log('✅ User logged in, redirecting to dashboard');
        // 已登录，跳转到首页（工作台）
        return <Navigate to="/dashboard/console" replace />;
    }

    console.log('❌ User not logged in, redirecting to login');
    // 未登录，跳转到登录页
    return <Navigate to="/login" replace />;
};

const App = () => {
    return (
        <Routes>
            {/* 根路径重定向 */}
            <Route path="/" element={<RootRedirect />} />

            {/* 公开路由 - 登录页 */}
            <Route
                path={ROUTES.LOGIN}
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            {/* 简化登录路由 */}
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />

            {/* 其他所有路由都通过动态路由处理 */}
            <Route path="/*" element={<DynamicRouter />} />
        </Routes>
    );
};

export default App;
