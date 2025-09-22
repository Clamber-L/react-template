import { Permission } from '@/types/user';
import { PermissionType } from '@/types/enum';

/**
 * Mock路由数据 - 模拟后端返回的路由树
 * 这些路由定义了用户可以访问的所有页面
 */
export const mockRouteTree: Permission[] = [
    {
        id: '1',
        path: '/dashboard',
        name: 'Dashboard',
        resourceType: PermissionType.CATALOGUE,
        label: '仪表板',
        icon: 'DashboardOutlined',
        hide: false,
        parentId: '',
        sortValue: 0,
        frameSrc: '',
        disabled: false,
        children: [
            {
                id: '4',
                path: '/dashboard',
                component: 'Dashboard',
                name: 'DashboardConsole',
                label: '工作台',
                parentId: '1',
                sortValue: 1,
                resourceType: PermissionType.MENU,
                frameSrc: '',
                disabled: false,
            },
            // {
            //     id: 'dashboard-demo',
            //     path: '/dashboard/demo',
            //     component: 'DynamicRouteDemo',
            //     name: 'DynamicRouteDemo',
            //     enabled: true,
            //     createTime: '2024-01-01T00:00:00Z',
            //     updateTime: '2024-01-01T00:00:00Z',
            //     meta: {
            //         title: '动态路由演示',
            //         keepAlive: true,
            //         requireAuth: true,
            //     },
            // },
            // {
            //     id: 'dashboard-analysis',
            //     path: '/dashboard/analysis',
            //     component: 'Analysis',
            //     name: 'DashboardAnalysis',
            //     enabled: true,
            //     createTime: '2024-01-01T00:00:00Z',
            //     updateTime: '2024-01-01T00:00:00Z',
            //     meta: {
            //         title: '分析页',
            //         keepAlive: true,
            //         requireAuth: true,
            //     },
            // },
            // {
            //     id: 'dashboard-ecommerce',
            //     path: '/dashboard/ecommerce',
            //     component: 'Dashboard',
            //     name: 'DashboardEcommerce',
            //     enabled: true,
            //     createTime: '2024-01-01T00:00:00Z',
            //     updateTime: '2024-01-01T00:00:00Z',
            //     meta: {
            //         title: '电商数据',
            //         keepAlive: true,
            //         requireAuth: true,
            //     },
            // },
        ],
    },
    {
        id: '2',
        path: '/components',
        name: 'Components',
        label: '组件',
        icon: 'AppstoreOutlined',
        hide: false,
        parentId: '',
        sortValue: 0,
        resourceType: PermissionType.CATALOGUE,
        frameSrc: '',
        disabled: false,
    },
    {
        id: '3',
        path: '/templates',
        name: 'Templates',
        label: '页面模板',
        icon: 'LayoutOutlined',
        hide: false,
        parentId: '',
        sortValue: 0,
        resourceType: PermissionType.CATALOGUE,
        frameSrc: '',
        disabled: false,
    },
];
