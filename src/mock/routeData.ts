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
                path: '/dashboard-console',
                component: 'Dashboard',
                name: 'DashboardConsole',
                label: '工作台',
                parentId: '1',
                sortValue: 1,
                resourceType: PermissionType.MENU,
                frameSrc: '',
                disabled: false,
            },
            {
                id: '5',
                path: '/dashboard-analysis',
                component: 'Analysis',
                name: 'Analysis',
                label: '分析页',
                parentId: '1',
                sortValue: 2,
                resourceType: PermissionType.MENU,
                frameSrc: '',
                disabled: false,
            },
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