import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import type { MenuProps } from 'antd';

import { useNavigate, useLocation, useMatches } from 'react-router-dom';

import { usePermissionRoutes } from '@/hooks/use-permission-routes';
import { menuFilter } from '@/utils/tree';

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const matches = useMatches();
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const permissionRoutes = usePermissionRoutes();

    const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
        navigate(key);
    };

    // 初始化展开的菜单项
    useEffect(() => {
        const openKey = matches
            .filter((match) => match.pathname !== '/')
            .map((match) => match.pathname);
        setOpenKeys(openKey);
        setSelectedKeys([location.pathname]);
    }, [location.pathname, collapsed, matches]);

    useEffect(() => {
        const menuRoutes = menuFilter(permissionRoutes);
        console.log('menuRoutes: ', menuRoutes);
        // const menus = routeToMenuFn(menuRoutes);
        // setMenuList(menus);
    }, [permissionRoutes]);

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
            {/* <Menu */}
            {/*     mode="inline" */}
            {/*     selectedKeys={[location.pathname]} */}
            {/*     openKeys={openKeys} */}
            {/*     onOpenChange={setOpenKeys} */}
            {/*     onClick={handleMenuClick} */}
            {/*     className="border-none bg-transparent" */}
            {/*     theme="light" */}
            {/*     items={items} */}
            {/* /> */}
        </Sider>
    );
};

export default Sidebar;
