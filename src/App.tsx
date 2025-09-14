import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from 'antd';

import { useAuth } from './stores/useAuthStore';
import { PrivateRoute, PublicRoute } from './components/AuthGuard';
import { ROUTES } from './constants/routes';

// 布局组件
import MainLayout from './pages/MainLayout';

// 页面组件
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import ComponentsBasic from './pages/ComponentsBasic';

// 演示组件
import SimpleAntdDemo from './components/SimpleAntdDemo';
import AntdDemo from './components/AntdDemo';

const App = () => {
    const { isLogin } = useAuth();

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

            {/* 私有路由 - 主布局 */}
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <MainLayout />
                    </PrivateRoute>
                }
            >
                {/* 默认路由重定向 */}
                <Route index element={<Navigate to={ROUTES.DASHBOARD_CONSOLE} replace />} />

                {/* 仪表板路由 */}
                <Route
                    path="dashboard"
                    element={<Navigate to={ROUTES.DASHBOARD_CONSOLE} replace />}
                />
                <Route path={ROUTES.DASHBOARD_CONSOLE.substring(1)} element={<Dashboard />} />
                <Route path={ROUTES.DASHBOARD_ANALYSIS.substring(1)} element={<Analysis />} />
                <Route path={ROUTES.DASHBOARD_ECOMMERCE.substring(1)} element={<Dashboard />} />

                {/* 组件路由 */}
                <Route
                    path="components"
                    element={<Navigate to={ROUTES.COMPONENTS_BASIC} replace />}
                />
                <Route path={ROUTES.COMPONENTS_BASIC.substring(1)} element={<ComponentsBasic />} />
                <Route path={ROUTES.COMPONENTS_FORM.substring(1)} element={<AntdDemo />} />
                <Route path={ROUTES.COMPONENTS_DATA.substring(1)} element={<SimpleAntdDemo />} />
                <Route path={ROUTES.COMPONENTS_FEEDBACK.substring(1)} element={<AntdDemo />} />

                {/* 模板路由 */}
                <Route path="templates" element={<Navigate to={ROUTES.TEMPLATES_LIST} replace />} />
                <Route path={ROUTES.TEMPLATES_LIST.substring(1)} element={<SimpleAntdDemo />} />
                <Route path={ROUTES.TEMPLATES_FORM.substring(1)} element={<AntdDemo />} />
                <Route path={ROUTES.TEMPLATES_DETAIL.substring(1)} element={<ComponentsBasic />} />
                <Route path={ROUTES.TEMPLATES_RESULT.substring(1)} element={<Analysis />} />

                {/* 图表路由 */}
                <Route path="charts" element={<Navigate to={ROUTES.CHARTS_ECHARTS} replace />} />
                <Route path={ROUTES.CHARTS_ECHARTS.substring(1)} element={<Analysis />} />
                <Route path={ROUTES.CHARTS_ANTV.substring(1)} element={<ComponentsBasic />} />

                {/* 系统管理路由 */}
                <Route path="system" element={<Navigate to={ROUTES.SYSTEM_USERS} replace />} />
                <Route path={ROUTES.SYSTEM_USERS.substring(1)} element={<AntdDemo />} />
                <Route path={ROUTES.SYSTEM_ROLES.substring(1)} element={<SimpleAntdDemo />} />
                <Route
                    path={ROUTES.SYSTEM_PERMISSIONS.substring(1)}
                    element={<ComponentsBasic />}
                />
            </Route>

            {/* 404 页面 */}
            <Route
                path="*"
                element={
                    <div className="flex items-center justify-center h-screen">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                                404
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">页面不存在</p>
                            <Button type="primary" onClick={() => (window.location.href = '/')}>
                                返回首页
                            </Button>
                        </div>
                    </div>
                }
            />
        </Routes>
    );
};

export default App;
