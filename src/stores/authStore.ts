import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { authApi } from '@/api/authApi';
import { UserInfo } from '@/types/user';

// 登录接口参数
export interface LoginParams {
    username: string;
    password: string;
    rememberPassword?: boolean;
}

// 登录响应
export interface LoginResponse {
    token: string;
    refreshToken?: string;
    userInfo: UserInfo;
}

// 认证状态接口
interface AuthState {
    // 状态
    isLogin: boolean;
    loading: boolean;
    userInfo: UserInfo;
    accessToken: string;
    refreshToken: string;

    // Actions
    setLoading: (loading: boolean) => void;
    setToken: (accessToken: string, refreshToken?: string) => void;
    setUserInfo: (userInfo: UserInfo) => void;
    setLoginStatus: (status: boolean) => void;
    login: (params: LoginParams) => Promise<LoginResponse>;
    logout: () => void;
    clearAuth: () => void;
}

// 获取存储的初始状态
const getInitialState = () => ({
    // 为了演示目的，默认设置为已登录状态
    // 在实际项目中应该设置为 false
    isLogin: true,
    loading: false,
    userInfo: {} as UserInfo,
    accessToken: '',
    refreshToken: '',
});

export const authStore = create<AuthState>()(
    persist(
        (set, get) => ({
            ...getInitialState(),

            // 设置加载状态
            setLoading: (loading: boolean) => {
                set({ loading });
            },

            // 设置令牌
            setToken: (accessToken: string, refreshToken?: string) => {
                set({
                    accessToken,
                    refreshToken: refreshToken || get().refreshToken,
                });
            },

            // 设置用户信息
            setUserInfo: (userInfo: UserInfo) => {
                set({ userInfo });
            },

            // 设置登录状态
            setLoginStatus: (status: boolean) => {
                set({ isLogin: status });
            },

            // 登录方法
            login: async (params: LoginParams): Promise<LoginResponse> => {
                set({ loading: true });

                try {
                    // 调用API服务
                    const response = await authApi.login(params);

                    // 设置登录状态
                    set({
                        isLogin: true,
                        accessToken: response.token,
                        refreshToken: response.refreshToken || '',
                        userInfo: response.userInfo,
                        loading: false,
                    });

                    return response;
                } catch (error) {
                    set({ loading: false });
                    throw error;
                }
            },

            // 退出登录
            logout: () => {
                set({
                    ...getInitialState(),
                });

                // 清除其他相关存储
                sessionStorage.removeItem('appRoutes');

                // 重定向到登录页面将在组件中处理
                localStorage.removeItem('auth-storage');
            },

            // 清除认证信息
            clearAuth: () => {
                set({
                    ...getInitialState(),
                });
            },
        }),
        {
            name: 'auth-storage', // 存储键名
            storage: {
                getItem: (name) => {
                    const str = localStorage.getItem(name);
                    if (!str) return null;
                    try {
                        return JSON.parse(str);
                    } catch {
                        return null;
                    }
                },
                setItem: (name, value) => {
                    localStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name) => {
                    localStorage.removeItem(name);
                },
            },
            // 选择需要持久化的字段
            partialize: (state) => ({
                isLogin: state.isLogin,
                userInfo: state.userInfo,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                loading: false,
                setLoading: state.setLoading,
                setToken: state.setToken,
                setUserInfo: state.setUserInfo,
                setLoginStatus: state.setLoginStatus,
                login: state.login,
                logout: state.logout,
                clearAuth: state.clearAuth,
            }),
        },
    ),
);

// 导出选择器hook
export const useAuth = () => {
    const store = authStore();
    return {
        // 状态
        isLogin: store.isLogin,
        loading: store.loading,
        userInfo: store.userInfo,
        accessToken: store.accessToken,

        // 操作
        login: store.login,
        logout: store.logout,
        setLoading: store.setLoading,
    };
};
