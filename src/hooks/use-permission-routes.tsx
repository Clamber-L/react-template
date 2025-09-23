import React, { lazy, Suspense, useMemo } from 'react';

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
    // 根据实际的文件结构构造正确的路径
    const fullPath = `/src/pages/${path}.tsx`;
    return pages[fullPath];
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
            // 确保 component 存在
            if (component) {
                const componentResolver = resolveComponent(component);

                // 添加检查确保 componentResolver 存在且是一个函数
                if (componentResolver && typeof componentResolver === 'function') {
                    const Element = lazy(
                        componentResolver as () => Promise<{ default: React.ComponentType<any> }>,
                    );
                    if (frameSrc) {
                        appRoute.element = <Element src={frameSrc} />;
                    } else {
                        appRoute.element = <Element />;
                    }
                } else {
                    // 如果找不到组件或不是函数，提供一个默认的错误组件
                    appRoute.element = (
                        <div>Error: Component not found or invalid - {component}</div>
                    );
                }
            } else {
                // 如果没有指定 component，提供一个默认的错误组件
                appRoute.element = <div>Error: No component specified</div>;
            }
        }

        return appRoute;
    });
};

const getCompleteRoute = (permission: Permission, flattenedPermissions: Permission[]): string => {
    // 对于子路由，我们需要构建完整的路径
    if (permission.parentId) {
        const parentPermission = flattenedPermissions.find((p) => p.id === permission.parentId);
        if (parentPermission) {
            // 递归获取父级完整路径
            const parentPath: string = getCompleteRoute(parentPermission, flattenedPermissions);
            // 组合路径，确保正确的分隔符
            // 如果父路径是根路径，特殊处理
            if (parentPath === '/') {
                return `/${permission.path}`;
            }
            // 否则，组合父路径和当前路径
            return `${parentPath}${permission.path}`;
        }
    }

    // 根路径或没有父级的路径
    return permission.path || '/';
};
