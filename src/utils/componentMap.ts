import { ComponentMap } from '@/types/route';

// 页面组件
import Dashboard from '@/pages/Dashboard';
import Analysis from '@/pages/Analysis';
import ComponentsBasic from '@/pages/ComponentsBasic';
import Login from '@/pages/Login';
import MainLayout from '@/pages/MainLayout';

// 演示组件
import SimpleAntdDemo from '@/components/SimpleAntdDemo';
import AntdDemo from '@/components/AntdDemo';
import WorkInProgressPage from '@/components/WorkInProgressPage';

/**
 * 页面组件映射表
 * 用于将字符串形式的组件名映射到实际的React组件
 */
export const componentMap: ComponentMap = {
    // 布局组件
    MainLayout,

    // 页面组件
    Login,
    Dashboard,
    Analysis,
    ComponentsBasic,

    // 演示组件
    SimpleAntdDemo,
    AntdDemo,
    WorkInProgressPage,

    // 可以根据需要继续添加更多组件映射
    // 'UserManagement': UserManagement,
    // 'RoleManagement': RoleManagement,
    // 'PermissionManagement': PermissionManagement,
    // 'SystemSettings': SystemSettings,
    // 'Charts': Charts,
    // 'Reports': Reports,
};

/**
 * 获取组件实例
 * @param componentName 组件名称
 * @returns React组件或undefined
 */
export const getComponent = (componentName: string): React.ComponentType<any> | undefined => {
    return componentMap[componentName];
};

/**
 * 检查组件是否存在
 * @param componentName 组件名称
 * @returns 是否存在该组件
 */
export const hasComponent = (componentName: string): boolean => {
    return componentName in componentMap;
};

/**
 * 获取所有可用的组件名称列表
 * @returns 组件名称数组
 */
export const getAvailableComponents = (): string[] => {
    return Object.keys(componentMap);
};
