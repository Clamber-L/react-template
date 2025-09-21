import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Spin, Button } from 'antd';

import { useAuth } from '@/stores/authStore';
import { getComponent } from '@/lib';
import { getMockRoutes, isPathAllowed } from '@/mock/routeData';
import { DynamicRoute } from '@/types/route';

/**
 * 动态路由生成器组件
 * 从后端获取路由配置，动态生成路由结构
 */
export const DynamicRouter = () => {
    const { isLogin } = useAuth();
    const location = useLocation();
    const [routes, setRoutes] = useState<DynamicRoute[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 获取路由数据
    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                setLoading(true);
                const routeData = await getMockRoutes();
                setRoutes(routeData);
                console.log('✅ 动态路由加载成功:', routeData);
            } catch (err) {
                console.error('❌ 动态路由加载失败:', err);
                setError('路由加载失败');
            } finally {
                setLoading(false);
            }
        };

        if (isLogin) {
            fetchRoutes();
        }
    }, [isLogin]);

    // 如果未登录，重定向到登录页
    if (!isLogin) {
        console.log('❌ User not logged in, redirecting to login');
        return <Navigate to="/login" replace />;
    }

    // 加载状态
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spin size="large" spinning>
                    <div className="p-8">
                        <div className="text-gray-600 text-center">加载路由配置中...</div>
                    </div>
                </Spin>
            </div>
        );
    }

    // 错误状态
    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">路由加载失败</h1>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Button type="primary" onClick={() => window.location.reload()}>
                        重新加载
                    </Button>
                </div>
            </div>
        );
    }

    // 检查当前路径是否在允许的路由中
    const currentPath = location.pathname;
    const isCurrentPathAllowed = isPathAllowed(currentPath, routes);

    console.log('🔍 DynamicRouter rendering:');
    console.log('- Current path:', currentPath);
    console.log('- Is path allowed:', isCurrentPathAllowed);
    console.log('- Available routes:', routes);

    // 递归构建路由组件
    const buildRoutes = (routeList: DynamicRoute[]): JSX.Element[] => {
        return routeList
            .filter((route) => route.enabled)
            .map((route) => {
                const Component = getComponent(route.component);

                if (!Component) {
                    console.warn(`⚠️ Component not found: ${route.component}`);
                    return null;
                }

                // 如果有子路由，则构建嵌套路由
                if (route.children && route.children.length > 0) {
                    return (
                        <Route key={route.id} path={route.path} element={<Component />}>
                            {buildRoutes(route.children)}
                        </Route>
                    );
                }

                // 叶子路由
                return <Route key={route.id} path={route.path} element={<Component />} />;
            })
            .filter(Boolean) as JSX.Element[];
    };

    // 获取MainLayout组件
    const MainLayout = getComponent('MainLayout');

    return (
        <Routes>
            {/* 根路径重定向到工作台 */}
            <Route path="/" element={<Navigate to="/dashboard/console" replace />} />

            {/* 如果有MainLayout组件，则用它包装所有路由 */}
            {MainLayout ? (
                <Route path="/" element={<MainLayout />}>
                    {buildRoutes(routes)}
                    {/* 404 页面 - 当访问不在路由树中的路径时显示 */}
                    <Route
                        path="*"
                        element={
                            <div className="flex items-center justify-center h-screen">
                                <div className="text-center max-w-md">
                                    <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                                        页面不存在
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                                        您访问的页面不在系统允许的路由列表中
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                                        当前路径:{' '}
                                        <code className="bg-gray-100 px-2 py-1 rounded">
                                            {currentPath}
                                        </code>
                                    </p>
                                    <div className="space-y-2">
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                window.location.href = '/dashboard/console';
                                            }}
                                        >
                                            返回首页
                                        </Button>
                                        <br />
                                        <Button
                                            type="link"
                                            onClick={() => {
                                                console.log('📋 允许的路由列表:', routes);
                                            }}
                                        >
                                            查看允许的路由
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </Route>
            ) : (
                <>
                    {buildRoutes(routes)}
                    {/* 404 页面 - 当访问不在路由树中的路径时显示 */}
                    <Route
                        path="*"
                        element={
                            <div className="flex items-center justify-center h-screen">
                                <div className="text-center max-w-md">
                                    <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                                        页面不存在
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                                        您访问的页面不在系统允许的路由列表中
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                                        当前路径:{' '}
                                        <code className="bg-gray-100 px-2 py-1 rounded">
                                            {currentPath}
                                        </code>
                                    </p>
                                    <div className="space-y-2">
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                window.location.href = '/dashboard/console';
                                            }}
                                        >
                                            返回首页
                                        </Button>
                                        <br />
                                        <Button
                                            type="link"
                                            onClick={() => {
                                                console.log('📋 允许的路由列表:', routes);
                                            }}
                                        >
                                            查看允许的路由
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </>
            )}
        </Routes>
    );
};

export default DynamicRouter;
