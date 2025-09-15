import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { MENU_CONFIG, MenuConfig } from '@/config';

export interface BreadcrumbItem {
    key: string;
    title: string;
    path: string;
    icon?: string;
    closable?: boolean;
}

interface BreadcrumbState {
    // 历史记录面包屑列表
    breadcrumbHistory: BreadcrumbItem[];
    // 当前激活的面包屑
    activeKey: string;

    // Actions
    addBreadcrumb: (path: string) => void;
    removeBreadcrumb: (key: string) => void;
    setActiveBreadcrumb: (key: string) => void;
    clearAllBreadcrumbs: () => void;
    removeOtherBreadcrumbs: (key: string) => void;
}

// 递归查找路径对应的菜单项
const findMenuByPath = (menuItems: MenuConfig[], targetPath: string): MenuConfig | null => {
    for (const item of menuItems) {
        if (item.path === targetPath) {
            return item;
        }

        if (item.children) {
            const found = findMenuByPath(item.children, targetPath);
            if (found) return found;
        }
    }
    return null;
};

// 根据路径生成面包屑项
const generateBreadcrumbItem = (path: string): BreadcrumbItem | null => {
    // 首页特殊处理
    if (path === '/dashboard/console' || path === '/') {
        return {
            key: '/dashboard/console',
            title: '工作台',
            path: '/dashboard/console',
            icon: 'HomeOutlined',
            closable: false, // 首页不可关闭
        };
    }

    // 从菜单配置中查找
    const menu = findMenuByPath(MENU_CONFIG, path);
    if (menu && menu.meta?.title) {
        return {
            key: path,
            title: menu.meta.title,
            path,
            icon: menu.meta.icon,
            closable: true,
        };
    }

    // 手动处理一些特殊路径
    const pathTitleMap: Record<string, string> = {
        '/dashboard/analysis': '分析页',
        '/components/basic': '基础组件',
        '/components/form': '表单组件',
        '/components/data': '数据展示',
        '/templates/list': '列表页面',
        '/templates/form': '表单页面',
        '/templates/detail': '详情页面',
    };

    const title = pathTitleMap[path];
    if (title) {
        return {
            key: path,
            title,
            path,
            closable: true,
        };
    }

    return null;
};

export const useBreadcrumbStore = create<BreadcrumbState>()(
    persist(
        (set, get) => ({
            breadcrumbHistory: [
                {
                    key: '/dashboard/console',
                    title: '工作台',
                    path: '/dashboard/console',
                    icon: 'HomeOutlined',
                    closable: false,
                },
            ],
            activeKey: '/dashboard/console',

            // 添加面包屑
            addBreadcrumb: (path: string) => {
                const { breadcrumbHistory } = get();

                // 检查是否已存在
                const existingIndex = breadcrumbHistory.findIndex((item) => item.key === path);
                if (existingIndex !== -1) {
                    // 如果已存在，只需要设置为激活状态
                    set({ activeKey: path });
                    return;
                }

                // 生成新的面包屑项
                const newItem = generateBreadcrumbItem(path);
                if (!newItem) return;

                // 限制历史记录数量（最多10个）
                let newHistory = [...breadcrumbHistory, newItem];
                if (newHistory.length > 10) {
                    // 保留首页，删除最旧的可关闭项
                    const removableItems = newHistory.filter((item) => item.closable);
                    if (removableItems.length > 0) {
                        const toRemove = removableItems[0];
                        newHistory = newHistory.filter((item) => item.key !== toRemove.key);
                    }
                }

                set({
                    breadcrumbHistory: newHistory,
                    activeKey: path,
                });
            },

            // 移除面包屑
            removeBreadcrumb: (key: string) => {
                const { breadcrumbHistory, activeKey } = get();
                const newHistory = breadcrumbHistory.filter((item) => item.key !== key);

                // 如果删除的是当前激活的，需要跳转到其他页面
                let newActiveKey = activeKey;
                if (activeKey === key) {
                    // 优先跳转到最后一个面包屑，如果没有则跳转到首页
                    newActiveKey =
                        newHistory.length > 0
                            ? newHistory[newHistory.length - 1].key
                            : '/dashboard/console';
                }

                set({
                    breadcrumbHistory: newHistory,
                    activeKey: newActiveKey,
                });

                // 如果删除的是当前页面，需要导航到新的激活页面
                // 不直接使用 window.location.href，而是触发自定义事件
                // 让 Breadcrumb 组件监听并使用 react-router 进行导航
                if (activeKey === key && typeof window !== 'undefined') {
                    window.dispatchEvent(
                        new CustomEvent('breadcrumb-navigate', {
                            detail: { path: newActiveKey },
                        }),
                    );
                }
            },

            // 设置激活的面包屑
            setActiveBreadcrumb: (key: string) => {
                set({ activeKey: key });
            },

            // 清除所有面包屑（保留首页）
            clearAllBreadcrumbs: () => {
                const homeItem = {
                    key: '/dashboard/console',
                    title: '工作台',
                    path: '/dashboard/console',
                    icon: 'HomeOutlined',
                    closable: false,
                };

                set({
                    breadcrumbHistory: [homeItem],
                    activeKey: '/dashboard/console',
                });

                // 触发导航事件跳转到首页
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(
                        new CustomEvent('breadcrumb-navigate', {
                            detail: { path: '/dashboard/console' },
                        }),
                    );
                }
            },

            // 移除其他面包屑（保留当前和首页）
            removeOtherBreadcrumbs: (key: string) => {
                const { breadcrumbHistory } = get();
                const currentItem = breadcrumbHistory.find((item) => item.key === key);
                const homeItem = breadcrumbHistory.find(
                    (item) => item.key === '/dashboard/console',
                );

                const newHistory = [homeItem, currentItem].filter(Boolean) as BreadcrumbItem[];

                set({
                    breadcrumbHistory: newHistory,
                    activeKey: key,
                });
            },
        }),
        {
            name: 'breadcrumb-history-storage',
            partialize: (state) => ({
                breadcrumbHistory: state.breadcrumbHistory,
                activeKey: state.activeKey,
            }),
        },
    ),
);

// 导出选择器hook
export const useBreadcrumb = () => {
    const store = useBreadcrumbStore();
    return {
        breadcrumbHistory: store.breadcrumbHistory,
        activeKey: store.activeKey,
        addBreadcrumb: store.addBreadcrumb,
        removeBreadcrumb: store.removeBreadcrumb,
        setActiveBreadcrumb: store.setActiveBreadcrumb,
        clearAllBreadcrumbs: store.clearAllBreadcrumbs,
        removeOtherBreadcrumbs: store.removeOtherBreadcrumbs,
    };
};
