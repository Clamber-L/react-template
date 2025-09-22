import { lazy, Suspense, useMemo } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useUserPermission } from '@/stores/userStore';
import { flattenTrees } from '@/utils/tree';
import { Permission } from '@/types/user';
import { AppRouteObject } from '@/types/router';
import { PermissionType } from '@/types/enum';
import CircleLoading from '@/components/loading/CircleLoading';
import { mockRouteTree } from '@/mock/routeData';

const pages = import.meta.glob('/src/pages/**/*.tsx');

// 构建绝对路径的函数
function resolveComponent(path: string) {
    return pages[`/src/pages${path}`];
}

export const usePermissionRoutes = () => {
    // const permissions = useUserPermission();
    let permissions = useUserPermission();

    // 测试数据
    permissions = mockRouteTree;

    return useMemo(() => {
        const flattenedPermissions = flattenTrees(permissions);
        const permissionRoutes = transformPermissionToMenuRoutes(
            permissions || [],
            flattenedPermissions,
        );
        return [...permissionRoutes];
    }, [permissions]);
};

const transformPermissionToMenuRoutes = (
    permissions: Permission[],
    flattenedPermissions: Permission[],
) => {
    return permissions.map((permission) => {
        const {
            path,
            resourceType,
            label,
            icon,
            sortValue,
            hide,
            frameSrc,
            component,
            parentId,
            disabled,
            children = [],
        } = permission;

        const appRoute: AppRouteObject = {
            path,
            meta: {
                label,
                key: getCompleteRoute(permission, flattenedPermissions),
                hideMenu: !!hide,
                disabled,
            },
        };

        if (sortValue) appRoute.sortValue = sortValue;
        if (icon) appRoute.meta!.icon = icon;
        if (frameSrc) appRoute.meta!.frameSrc = frameSrc;

        if (resourceType === PermissionType.CATALOGUE) {
            appRoute.meta!.hideTab = true;
            if (!parentId) {
                appRoute.element = (
                    <Suspense fallback={<CircleLoading />}>
                        <Outlet />
                    </Suspense>
                );
            }
            appRoute.children = transformPermissionToMenuRoutes(children, flattenedPermissions);
            if (children && children.length > 0 && children[0].path) {
                appRoute.children.unshift({
                    index: true,
                    element: <Navigate to={children[0].path} replace />,
                });
            }
        } else if (resourceType === PermissionType.MENU) {
            const Element = lazy(resolveComponent(component!) as any);
            if (frameSrc) {
                appRoute.element = <Element src={frameSrc} />;
            } else {
                appRoute.element = <Element />;
            }
        }

        return appRoute;
    });
};

const getCompleteRoute = (
    permission: Permission,
    flattenedPermissions: Permission[],
    path = '',
) => {
    const currentRoute = path ? `/${permission.path}${path}` : `/${permission.path}`;

    if (permission.parentId) {
        const parentPermission = flattenedPermissions.find((p) => p.id === permission.parentId)!;
        return getCompleteRoute(parentPermission, flattenedPermissions, currentRoute);
    }

    return currentRoute;
};
