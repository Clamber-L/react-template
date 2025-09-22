import React, { useState, useEffect } from 'react';
import { Layout, Menu, Spin } from 'antd';
import type { MenuProps } from 'antd';
import {
    DashboardOutlined,
    AppstoreOutlined,
    LayoutOutlined,
    BarChartOutlined,
    SettingOutlined,
    UserOutlined,
    HomeOutlined,
    BuildOutlined,
    FormOutlined,
    TableOutlined,
    UnorderedListOutlined,
    EditOutlined,
    FileTextOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

import { getMockRoutes } from '@/config';

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
}

// 图标映射
const ICON_MAP = {
    DashboardOutlined,
    AppstoreOutlined,
    LayoutOutlined,
    BarChartOutlined,
    SettingOutlined,
    UserOutlined,
    HomeOutlined,
    BuildOutlined,
    FormOutlined,
    TableOutlined,
    UnorderedListOutlined,
    EditOutlined,
    FileTextOutlined,
} as const;

// 获取图标组件
const getIcon = (iconName?: string) => {
    if (!iconName || !(iconName in ICON_MAP)) return null;
    const IconComponent = ICON_MAP[iconName as keyof typeof ICON_MAP];
    return <IconComponent />;
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [routes, setRoutes] = useState<DynamicRoute[]>([]);
    const [loading, setLoading] = useState(true);

    // 获取动态路由数据
    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const routeData = await getMockRoutes();
                setRoutes(routeData);
                console.log('📋 Sidebar: 获取路由数据成功', routeData);
            } catch (error) {
                console.error('❌ Sidebar: 获取路由数据失败', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoutes();
    }, []);

    const handleMenuClick = ({ key }: { key: string }) => {
        navigate(key);
    };

    // 递归构建菜单项
    const buildMenuItems = (menuItems: DynamicRoute[]): MenuProps['items'] => {
        return menuItems
            .filter((menuItem) => menuItem.enabled && !menuItem.meta.hideInMenu)
            .map((menuItem) => {
                const { meta, children, path, id } = menuItem;

                if (children && children.length > 0) {
                    const childItems = buildMenuItems(children)?.filter(Boolean) || [];
                    if (childItems.length === 0) return null;

                    return {
                        key: id,
                        icon: getIcon(meta?.icon),
                        label: meta?.title,
                        children: childItems,
                    };
                }

                return {
                    key: path,
                    icon: getIcon(meta?.icon),
                    label: meta?.title,
                };
            })
            .filter(Boolean);
    };

    const menuItems = buildMenuItems(routes);

    // 获取当前选中的菜单项
    const getSelectedKeys = () => {
        const { pathname } = location;
        return [pathname];
    };

    // 获取默认展开的菜单项
    const getDefaultOpenKeys = () => {
        const { pathname } = location;
        const openKeysArray: string[] = [];

        // 查找匹配的父菜单
        const findParentKeys = (items: DynamicRoute[], currentPath: string) => {
            for (const item of items) {
                if (item.children) {
                    const hasMatchingChild = item.children.some((child: DynamicRoute) =>
                        currentPath.startsWith(child.path),
                    );
                    if (hasMatchingChild) {
                        openKeysArray.push(item.id);
                    }
                    findParentKeys(item.children, currentPath);
                }
            }
        };

        findParentKeys(routes, pathname);
        return openKeysArray;
    };

    // 初始化展开的菜单项
    React.useEffect(() => {
        if (routes.length > 0) {
            const defaultKeys = getDefaultOpenKeys();
            setOpenKeys(defaultKeys);
        }
    }, [location.pathname, routes]);

    // 处理菜单展开/收起 - 手风琴模式
    const handleOpenChange = (keys: string[]) => {
        const latestOpenKey = keys.find((key) => !openKeys.includes(key));
        if (latestOpenKey) {
            // 如果是展开操作，只保留当前展开的菜单项
            setOpenKeys([latestOpenKey]);
        } else {
            // 如果是收起操作，移除对应的菜单项
            setOpenKeys(keys);
        }
    };

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={256}
            className="bg-white dark:bg-black border-r border-gray-300 dark:border-gray-800 shadow-sm"
            theme="light"
        >
            {/* Logo区域 */}
            <div className="h-16 flex items-center justify-center border-b border-gray-300 dark:border-gray-800">
                {!collapsed && (
                    <div className="flex items-center">
                        <div className="text-2xl mr-2">🎨</div>
                        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Art Design
                        </span>
                    </div>
                )}
                {collapsed && <div className="text-2xl">🎨</div>}
            </div>

            {/* 菜单区域 */}
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <Spin size="small" />
                </div>
            ) : (
                <Menu
                    mode="inline"
                    selectedKeys={getSelectedKeys()}
                    openKeys={openKeys}
                    onOpenChange={handleOpenChange}
                    onClick={handleMenuClick}
                    className="border-none bg-transparent"
                    theme="light"
                    items={menuItems}
                />
            )}
        </Sider>
    );
};

export default Sidebar;
