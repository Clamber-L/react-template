import { DynamicRoute } from '@/types/route';

/**
 * 模拟的动态路由数据
 * 在实际项目中，这些数据应该从数据库获取
 */
export const mockRoutes: DynamicRoute[] = [
    {
        id: 'layout',
        path: '/',
        component: 'MainLayout',
        name: 'Layout',
        enabled: true,
        createTime: '2024-01-01T00:00:00Z',
        updateTime: '2024-01-01T00:00:00Z',
        meta: {
            title: '主布局',
            requireAuth: true,
            redirect: '/dashboard/console',
        },
        children: [
            {
                id: 'dashboard',
                path: '/dashboard',
                component: 'Dashboard',
                name: 'Dashboard',
                enabled: true,
                createTime: '2024-01-01T00:00:00Z',
                updateTime: '2024-01-01T00:00:00Z',
                meta: {
                    title: '仪表板',
                    icon: 'DashboardOutlined',
                    requireAuth: true,
                    redirect: '/dashboard/console',
                },
                children: [
                    {
                        id: 'dashboard-console',
                        path: '/dashboard/console',
                        component: 'Dashboard',
                        name: 'DashboardConsole',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: '工作台',
                            keepAlive: true,
                            requireAuth: true,
                        },
                    },
                    {
                        id: 'dashboard-demo',
                        path: '/dashboard/demo',
                        component: 'DynamicRouteDemo',
                        name: 'DynamicRouteDemo',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: '动态路由演示',
                            keepAlive: true,
                            requireAuth: true,
                        },
                    },
                    {
                        id: 'dashboard-analysis',
                        path: '/dashboard/analysis',
                        component: 'Analysis',
                        name: 'DashboardAnalysis',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: '分析页',
                            keepAlive: true,
                            requireAuth: true,
                        },
                    },
                    {
                        id: 'dashboard-ecommerce',
                        path: '/dashboard/ecommerce',
                        component: 'Dashboard',
                        name: 'DashboardEcommerce',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: '电商数据',
                            keepAlive: true,
                            requireAuth: true,
                        },
                    },
                ],
            },
            {
                id: 'components',
                path: '/components',
                component: 'WorkInProgressPage',
                name: 'Components',
                enabled: true,
                createTime: '2024-01-01T00:00:00Z',
                updateTime: '2024-01-01T00:00:00Z',
                meta: {
                    title: '组件',
                    icon: 'AppstoreOutlined',
                    requireAuth: true,
                    redirect: '/components/basic',
                },
                children: [
                    {
                        id: 'components-basic',
                        path: '/components/basic',
                        component: 'ComponentsBasic',
                        name: 'ComponentsBasic',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: '基础组件',
                            requireAuth: true,
                        },
                    },
                    {
                        id: 'components-form',
                        path: '/components/form',
                        component: 'AntdDemo',
                        name: 'ComponentsForm',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: '表单组件',
                            requireAuth: true,
                        },
                    },
                    {
                        id: 'components-data',
                        path: '/components/data',
                        component: 'SimpleAntdDemo',
                        name: 'ComponentsData',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: '数据展示',
                            requireAuth: true,
                        },
                    },
                    {
                        id: 'components-feedback',
                        path: '/components/feedback',
                        component: 'AntdDemo',
                        name: 'ComponentsFeedback',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: '反馈组件',
                            requireAuth: true,
                        },
                    },
                ],
            },
            {
                id: 'templates',
                path: '/templates',
                component: 'WorkInProgressPage',
                name: 'Templates',
                enabled: true,
                createTime: '2024-01-01T00:00:00Z',
                updateTime: '2024-01-01T00:00:00Z',
                meta: {
                    title: '页面模板',
                    icon: 'LayoutOutlined',
                    requireAuth: true,
                    redirect: '/templates/list',
                },
                children: [
                    {
                        id: 'templates-list',
                        path: '/templates/list',
                        component: 'SimpleAntdDemo',
                        name: 'TemplatesList',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: '列表页面',
                            requireAuth: true,
                        },
                    },
                    {
                        id: 'templates-form',
                        path: '/templates/form',
                        component: 'AntdDemo',
                        name: 'TemplatesForm',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: '表单页面',
                            requireAuth: true,
                        },
                    },
                    {
                        id: 'templates-detail',
                        path: '/templates/detail',
                        component: 'ComponentsBasic',
                        name: 'TemplatesDetail',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: '详情页面',
                            requireAuth: true,
                        },
                    },
                    {
                        id: 'templates-result',
                        path: '/templates/result',
                        component: 'Analysis',
                        name: 'TemplatesResult',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: '结果页面',
                            requireAuth: true,
                        },
                    },
                ],
            },
            {
                id: 'charts',
                path: '/charts',
                component: 'WorkInProgressPage',
                name: 'Charts',
                enabled: true,
                createTime: '2024-01-01T00:00:00Z',
                updateTime: '2024-01-01T00:00:00Z',
                meta: {
                    title: '图表',
                    icon: 'BarChartOutlined',
                    requireAuth: true,
                    redirect: '/charts/echarts',
                },
                children: [
                    {
                        id: 'charts-echarts',
                        path: '/charts/echarts',
                        component: 'Analysis',
                        name: 'ChartsEcharts',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: 'ECharts',
                            requireAuth: true,
                        },
                    },
                    {
                        id: 'charts-antv',
                        path: '/charts/antv',
                        component: 'ComponentsBasic',
                        name: 'ChartsAntv',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: 'AntV',
                            requireAuth: true,
                        },
                    },
                ],
            },
            {
                id: 'system',
                path: '/system',
                component: 'WorkInProgressPage',
                name: 'System',
                enabled: true,
                createTime: '2024-01-01T00:00:00Z',
                updateTime: '2024-01-01T00:00:00Z',
                meta: {
                    title: '系统管理',
                    icon: 'SettingOutlined',
                    requireAuth: true,
                    roles: ['admin'],
                    redirect: '/system/users',
                },
                children: [
                    {
                        id: 'system-users',
                        path: '/system/users',
                        component: 'AntdDemo',
                        name: 'SystemUsers',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: '用户管理',
                            requireAuth: true,
                            roles: ['admin'],
                        },
                    },
                    {
                        id: 'system-roles',
                        path: '/system/roles',
                        component: 'SimpleAntdDemo',
                        name: 'SystemRoles',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: '角色管理',
                            requireAuth: true,
                            roles: ['admin'],
                        },
                    },
                    {
                        id: 'system-permissions',
                        path: '/system/permissions',
                        component: 'ComponentsBasic',
                        name: 'SystemPermissions',
                        enabled: true,
                        createTime: '2024-01-01T00:00:00Z',
                        updateTime: '2024-01-01T00:00:00Z',
                        meta: {
                            title: '权限管理',
                            requireAuth: true,
                            roles: ['admin'],
                        },
                    },
                ],
            },
        ],
    },
];

/**
 * 根据用户角色过滤路由
 */
export const filterRoutesByRoles = (
    routes: DynamicRoute[],
    userRoles: string[],
): DynamicRoute[] => {
    return routes
        .filter((route) => {
            // 检查是否启用
            if (!route.enabled) return false;

            // 检查权限
            if (route.meta.roles && route.meta.roles.length > 0) {
                return route.meta.roles.some((role) => userRoles.includes(role));
            }
            return true;
        })
        .map((route) => ({
            ...route,
            children: route.children ? filterRoutesByRoles(route.children, userRoles) : undefined,
        }));
};

/**
 * Mock API - 模拟获取路由数据的API调用
 */
export const getMockRoutes = (): Promise<DynamicRoute[]> => {
    return new Promise((resolve) => {
        // 模拟网络延迟
        setTimeout(() => {
            console.log('📋 Mock API: 获取路由数据', mockRoutes);
            resolve(mockRoutes);
        }, 300);
    });
};

/**
 * 检查路径是否在允许的路由树中
 */
export const isPathAllowed = (path: string, routes: DynamicRoute[] = mockRoutes): boolean => {
    for (const route of routes) {
        // 检查当前路由
        if (route.path === path && route.enabled) {
            return true;
        }

        // 递归检查子路由
        if (route.children) {
            if (isPathAllowed(path, route.children)) {
                return true;
            }
        }
    }
    return false;
};

/**
 * 获取所有允许的路径列表
 */
export const getAllowedPaths = (routes: DynamicRoute[] = mockRoutes): string[] => {
    const paths: string[] = [];

    const collectPaths = (routeList: DynamicRoute[]) => {
        routeList.forEach((route) => {
            if (route.enabled) {
                paths.push(route.path);
            }
            if (route.children) {
                collectPaths(route.children);
            }
        });
    };

    collectPaths(routes);
    return paths;
};
