import { lazy } from 'react';
import { Navigate, RouteObject, RouterProvider, createHashRouter } from 'react-router-dom';

import { usePermissionRoutes } from '@/hooks/use-permission-routes';
import { AppRouteObject } from '@/types/router';
import ErrorRoute from '@/router/error-route';
import MainLayout from '@/pages/MainLayout';
import AuthGuard from '@/components/auth/AuthGuard';

export const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
const LoginRoute: AppRouteObject = {
    path: '/login',
    Component: lazy(() => import('@/pages/Login')),
};
const PAGE_NOT_FOUND_ROUTE: AppRouteObject = {
    path: '*',
    element: <Navigate to="/404" replace />,
};

export const Router = () => {
    const permissionRoutes = usePermissionRoutes();
    console.log('permissionRoutes', permissionRoutes);
    const asyncRoutes: AppRouteObject = {
        path: '/',
        element: (
            <AuthGuard>
                <MainLayout />
            </AuthGuard>
        ),
        children: [
            { index: true, element: <Navigate to={HOMEPAGE} replace /> },
            ...permissionRoutes,
        ],
    };

    const routes = [LoginRoute, asyncRoutes, ErrorRoute, PAGE_NOT_FOUND_ROUTE];

    const router = createHashRouter(routes as unknown as RouteObject[]);
    return <RouterProvider router={router} />;
};
