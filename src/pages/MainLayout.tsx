import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '../components';

const { Content } = Layout;

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className="min-h-screen">
            {/* <Sidebar collapsed={collapsed} onCollapse={setCollapsed} /> */}
            <Layout>
                <AppHeader collapsed={collapsed} onCollapse={setCollapsed} />
                {/* 面包屑导航 */}
                {/* <Breadcrumb /> */}
                <Content className="bg-gray-100 dark:bg-gray-900 transition-colors">
                    <div className="p-6">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
