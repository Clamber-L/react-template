import { Routes, Route, Navigate } from 'react-router-dom';

import { PublicRoute, DynamicRouter } from './components';
import { useAuth } from './stores/useAuthStore';
import { ROUTES } from './config';

// 页面组件
import Login from './pages/Login';

const App = () => {
    return (
        <Routes>
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

            {/* 所有其他路由都通过动态路由处理，包括根路径 */}
            <Route path="/*" element={<DynamicRouter />} />
        </Routes>
    );
};

export default App;
