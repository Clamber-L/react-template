import { DynamicRoute } from '@/types/route';

/**
 * Mock路由数据 - 模拟后端返回的路由树
 * 这些路由定义了用户可以访问的所有页面
 */
export const mockRouteTree: DynamicRoute[] = [
    {
        id: 'dashboard',
        path: '/dashboard',
        component: 'MainLayout',
        name: 'Dashboard',
        enabled: true,
        createTime: '2024-01-01T00:00:00Z',
        updateTime: '2024-01-01T00:00:00Z',
        meta: {
            title: '仪表板',
            icon: 'DashboardOutlined',
            hideInMenu: false,
            hideInTab: false,
            keepAlive: false,
        },
        children: [
            {
                id: 'dashboard-console',
                path: '/dashboard/console',
                component: 'Dashboard',
                name: 'Console',
                enabled: true,
                createTime: '2024-01-01T00:00:00Z',
                updateTime: '2024-01-01T00:00:00Z',
                meta: {
                    title: '工作台',
                    icon: 'HomeOutlined',
                    hideInMenu: false,
                    hideInTab: false,
                    keepAlive: true,
                },
            },
            {
                id: 'dashboard-analysis',
                path: '/dashboard/analysis',
                component: 'Analysis',
                name: 'Analysis',
                enabled: true,
                createTime: '2024-01-01T00:00:00Z',
                updateTime: '2024-01-01T00:00:00Z',
                meta: {
                    title: '分析页',
                    icon: 'BarChartOutlined',
                    hideInMenu: false,
                    hideInTab: false,
                    keepAlive: true,
                },
            },
        ],
    },
    {
        id: 'components',
        path: '/components',
        component: 'MainLayout',
        name: 'Components',
        enabled: true,
        createTime: '2024-01-01T00:00:00Z',
        updateTime: '2024-01-01T00:00:00Z',
        meta: {
            title: '组件',
            icon: 'AppstoreOutlined',
            hideInMenu: false,
            hideInTab: false,
            keepAlive: false,
        },
        children: [
            {
                id: 'components-basic',
                path: '/components/basic',
                component: 'ComponentsBasic',
                name: 'Basic',
                enabled: true,
                createTime: '2024-01-01T00:00:00Z',
                updateTime: '2024-01-01T00:00:00Z',
                meta: {
                    title: '基础组件',
                    icon: 'BuildOutlined',
                    hideInMenu: false,
                    hideInTab: false,
                    keepAlive: false,
                },
            },
            {
                id: 'components-form',
                path: '/components/form',
                component: 'AntdDemo',
                name: 'Form',
                enabled: true,
                createTime: '2024-01-01T00:00:00Z',
                updateTime: '2024-01-01T00:00:00Z',
                meta: {
                    title: '表单组件',
                    icon: 'FormOutlined',
                    hideInMenu: false,
                    hideInTab: false,
                    keepAlive: false,
                },
            },
            {
                id: 'components-data',
                path: '/components/data',
                component: 'SimpleAntdDemo',
                name: 'Data',
                enabled: true,
                createTime: '2024-01-01T00:00:00Z',
                updateTime: '2024-01-01T00:00:00Z',
                meta: {
                    title: '数据展示',
                    icon: 'TableOutlined',
                    hideInMenu: false,
                    hideInTab: false,
                    keepAlive: false,
                },
            },
        ],
    },
    {
        id: 'templates',
        path: '/templates',
        component: 'MainLayout',
        name: 'Templates',
        enabled: true,
        createTime: '2024-01-01T00:00:00Z',
        updateTime: '2024-01-01T00:00:00Z',
        meta: {
            title: '页面模板',
            icon: 'LayoutOutlined',
            hideInMenu: false,
            hideInTab: false,
            keepAlive: false,
        },
        children: [
            {
                id: 'templates-list',
                path: '/templates/list',
                component: 'WorkInProgressPage',
                name: 'List',
                enabled: true,
                createTime: '2024-01-01T00:00:00Z',
                updateTime: '2024-01-01T00:00:00Z',
                meta: {
                    title: '列表页面',
                    icon: 'UnorderedListOutlined',
                    hideInMenu: false,
                    hideInTab: false,
                    keepAlive: false,
                },
            },
            {
                id: 'templates-form',
                path: '/templates/form',
                component: 'WorkInProgressPage',
                name: 'Form',
                enabled: true,
                createTime: '2024-01-01T00:00:00Z',
                updateTime: '2024-01-01T00:00:00Z',
                meta: {
                    title: '表单页面',
                    icon: 'EditOutlined',
                    hideInMenu: false,
                    hideInTab: false,
                    keepAlive: false,
                },
            },
            {
                id: 'templates-detail',
                path: '/templates/detail',
                component: 'WorkInProgressPage',
                name: 'Detail',
                enabled: true,
                createTime: '2024-01-01T00:00:00Z',
                updateTime: '2024-01-01T00:00:00Z',
                meta: {
                    title: '详情页面',
                    icon: 'FileTextOutlined',
                    hideInMenu: false,
                    hideInTab: false,
                    keepAlive: false,
                },
            },
        ],
    },
];

/**
 * Mock API - 模拟获取路由数据的API调用
 */
export const getMockRoutes = (): Promise<DynamicRoute[]> => {
    return new Promise((resolve) => {
        // 模拟网络延迟
        setTimeout(() => {
            console.log('📋 Mock API: 获取路由数据', mockRouteTree);
            resolve(mockRouteTree);
        }, 300);
    });
};

/**
 * 检查路径是否在允许的路由树中
 */
export const isPathAllowed = (path: string, routes: DynamicRoute[] = mockRouteTree): boolean => {
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
export const getAllowedPaths = (routes: DynamicRoute[] = mockRouteTree): string[] => {
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
