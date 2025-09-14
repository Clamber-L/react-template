import { ReactNode } from 'react';

/**
 * 动态路由配置类型定义
 */

/** 路由元信息 */
export interface RouteMeta {
    /** 页面标题 */
    title: string;
    /** 图标 */
    icon?: string;
    /** 是否缓存页面 */
    keepAlive?: boolean;
    /** 所需权限角色 */
    roles?: string[];
    /** 是否在菜单中隐藏 */
    hideInMenu?: boolean;
    /** 是否在标签页中隐藏 */
    hideInTab?: boolean;
    /** 是否需要认证 */
    requireAuth?: boolean;
    /** 重定向路径 */
    redirect?: string;
}

/** 动态路由配置 */
export interface DynamicRoute {
    /** 路由唯一标识 */
    id: string;
    /** 路由路径 */
    path: string;
    /** 组件名称，用于映射到实际组件 */
    component: string;
    /** 路由名称 */
    name: string;
    /** 路由元信息 */
    meta: RouteMeta;
    /** 子路由 */
    children?: DynamicRoute[];
    /** 是否启用 */
    enabled: boolean;
    /** 创建时间 */
    createTime: string;
    /** 更新时间 */
    updateTime: string;
}

/** 路由配置查询参数 */
export interface RouteQueryParams {
    /** 是否只获取启用的路由 */
    enabled?: boolean;
    /** 用户角色，用于权限过滤 */
    roles?: string[];
}

/** 路由配置响应 */
export interface RouteConfigResponse {
    /** 路由列表 */
    routes: DynamicRoute[];
    /** 总数 */
    total: number;
}

/** 组件映射类型 */
export type ComponentMap = Record<string, React.ComponentType<any>>;

/** 路由树节点 */
export interface RouteTreeNode extends DynamicRoute {
    /** React组件 */
    element?: ReactNode;
    /** 子节点 */
    children?: RouteTreeNode[];
}
