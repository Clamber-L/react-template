import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';

import { useAuth } from '@/stores/useAuthStore';

interface AuthGuardProps {
    children: React.ReactNode;
    requireAuth?: boolean; // 是否需要认证，默认 true
    roles?: string[]; // 需要的角色权限
    fallback?: React.ReactNode; // 加载时的回退组件
}

/**
 * 路由守卫组件
 * 根据用户登录状态和权限控制页面访问
 */
const AuthGuard: React.FC<AuthGuardProps> = ({
    children,
    requireAuth = true,
    roles = [],
    fallback = (
        <div className="flex items-center justify-center h-screen">
            <Spin size="large" tip="加载中..." />
        </div>
    ),
}) => {
    const location = useLocation();
    const { isLogin, loading, userInfo } = useAuth();

    // 如果正在加载，显示加载状态
    if (loading) {
        return <>{fallback}</>;
    }

    // 如果不需要认证，直接渲染子组件
    if (!requireAuth) {
        // 如果已登录且访问登录页，重定向到首页
        if (isLogin && location.pathname === '/login') {
            return <Navigate to="/" replace />;
        }
        return <>{children}</>;
    }

    // 需要认证但未登录，重定向到登录页
    if (!isLogin) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 检查角色权限
    if (roles.length > 0 && userInfo) {
        const hasRequiredRole = roles.some(
            (role) => userInfo.roles.includes(role) || userInfo.roles.includes('admin'),
        );

        if (!hasRequiredRole) {
            // 没有权限，可以重定向到无权限页面或显示错误信息
            return (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                            访问被拒绝
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">您没有访问此页面的权限</p>
                    </div>
                </div>
            );
        }
    }

    // 验证通过，渲染子组件
    return <>{children}</>;
};

export default AuthGuard;

/**
 * 公共路由组件 - 不需要登录即可访问
 */
export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <AuthGuard requireAuth={false}>{children}</AuthGuard>;
};

/**
 * 私有路由组件 - 需要登录才能访问
 */
export const PrivateRoute: React.FC<{
    children: React.ReactNode;
    roles?: string[];
}> = ({ children, roles }) => {
    return (
        <AuthGuard requireAuth roles={roles}>
            {children}
        </AuthGuard>
    );
};

/**
 * 管理员路由组件 - 需要管理员权限
 */
export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AuthGuard requireAuth roles={['admin']}>
            {children}
        </AuthGuard>
    );
};
