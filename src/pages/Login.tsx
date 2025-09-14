import React, { useState, useRef, useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    Checkbox,
    message,
    notification,
    Dropdown,
    MenuProps,
} from 'antd';
import { GlobalOutlined, BulbOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/stores/useAuthStore';
import { useTheme } from '@/providers/ThemeProvider';

const { Option } = Select;

interface LoginFormData {
    account: string;
    username: string;
    password: string;
    rememberPassword: boolean;
}

interface Account {
    key: string;
    label: string;
    userName: string;
    password: string;
    roles: string[];
}

// 左侧视图组件
const LoginLeftView: React.FC = () => {
    return (
        <div className="relative box-border w-[65vw] h-full p-4 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900">
            <div className="relative z-50 flex items-center">
                <div className="text-5xl mr-3">🎨</div>
                <h1 className="ml-3 text-xl font-normal text-gray-800 dark:text-gray-200">
                    Art Design Pro
                </h1>
            </div>

            <div
                className="absolute inset-0 z-10 w-2/5 mx-auto animate-pulse"
                style={{ bottom: '10.5%' }}
            >
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-8xl mb-5 animate-bounce">💼</div>
                    <div className="flex gap-5">
                        <div className="text-3xl animate-pulse" style={{ animationDelay: '0s' }}>
                            📊
                        </div>
                        <div className="text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>
                            🚀
                        </div>
                        <div className="text-3xl animate-pulse" style={{ animationDelay: '1s' }}>
                            ⚡
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-20 w-full text-center">
                <h1 className="text-2xl font-normal text-gray-800 dark:text-gray-200">
                    开启您的创意之旅
                </h1>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    现代化的设计系统，助力您打造卓越的产品体验
                </p>
            </div>

            {/* 几何装饰元素 */}
            <div className="absolute top-[20%] left-[10%] w-15 h-15 border-2 border-blue-500 dark:border-blue-400 rounded-full opacity-30" />
            <div className="absolute top-[15%] right-[20%] w-10 h-10 bg-green-500 dark:bg-green-400 transform rotate-45 opacity-30" />
            <div className="absolute bottom-[30%] left-[15%] w-8 h-8 bg-orange-400 dark:bg-orange-500 rounded-full opacity-30" />
            <div className="absolute bottom-[20%] right-[15%] w-12 h-12 bg-purple-600 dark:bg-purple-500 rounded-lg opacity-30" />
            <div
                className="absolute top-1/2 left-1/2 w-48 h-48 transform -translate-x-1/2 -translate-y-1/2 opacity-30 rounded-full"
                style={{
                    background:
                        'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                }}
            />
            <div className="absolute top-[10%] right-[10%] w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-400 dark:from-yellow-400 dark:to-yellow-500 rounded-full cursor-pointer opacity-30 hover:scale-110 transition-transform" />
        </div>
    );
};

// 简化的拖拽验证组件
const DragVerify: React.FC<{
    value: boolean;
    onChange: (passed: boolean) => void;
    text: string;
    successText: string;
}> = ({ value, onChange, text, successText }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragPosition, setDragPosition] = useState(0);
    const dragRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !dragRef.current) return;

        const rect = dragRef.current.getBoundingClientRect();
        const newPosition = Math.max(0, Math.min(e.clientX - rect.left - 20, rect.width - 40));
        setDragPosition(newPosition);

        // 如果拖拽到80%以上就算成功
        if (newPosition > (rect.width - 40) * 0.8) {
            onChange(true);
            setIsDragging(false);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (!value) {
            setDragPosition(0);
        }
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, value]);

    return (
        <div className="relative w-full h-10 rounded-md overflow-hidden select-none" ref={dragRef}>
            <div
                className={`relative w-full h-10 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center transition-all ${
                    value
                        ? 'bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-600'
                        : ''
                }`}
            >
                <div
                    className="text-sm text-gray-500 dark:text-gray-400 transition-opacity"
                    style={{ opacity: value ? 0 : 1 }}
                >
                    {text}
                </div>
                <div
                    className="absolute text-sm text-green-500 dark:text-green-400 transition-opacity"
                    style={{ opacity: value ? 1 : 0 }}
                >
                    {successText}
                </div>
                <div
                    className="absolute left-0 top-0 w-10 h-10 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md flex items-center justify-center cursor-grab shadow-sm hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all active:cursor-grabbing"
                    style={{
                        transform: `translateX(${value ? (dragRef.current?.clientWidth || 0) - 40 : dragPosition}px)`,
                    }}
                    onMouseDown={handleMouseDown}
                >
                    {value ? '✓' : '→'}
                </div>
            </div>
        </div>
    );
};

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    const { toggleTheme } = useTheme();
    const [isPassing, setIsPassing] = useState(false);
    const [isClickPass, setIsClickPass] = useState(false);
    const [form] = Form.useForm<LoginFormData>();

    // 预设账号配置
    const accounts: Account[] = [
        {
            key: 'admin',
            label: '管理员',
            userName: 'admin',
            password: '123456',
            roles: ['R_ADMIN'],
        },
        {
            key: 'user',
            label: '普通用户',
            userName: 'user',
            password: '123456',
            roles: ['R_USER'],
        },
        {
            key: 'demo',
            label: '演示账号',
            userName: 'demo',
            password: '123456',
            roles: ['R_DEMO'],
        },
    ];

    // 语言选项
    const languageOptions = [
        { value: 'zh-CN', label: '简体中文' },
        { value: 'en-US', label: 'English' },
    ];

    const [currentLanguage, setCurrentLanguage] = useState('zh-CN');

    // 初始化表单
    useEffect(() => {
        handleAccountChange('admin');
    }, []);

    // 设置账号信息
    const handleAccountChange = (accountKey: string) => {
        const selectedAccount = accounts.find((account) => account.key === accountKey);
        if (selectedAccount) {
            form.setFieldsValue({
                username: selectedAccount.userName,
                password: selectedAccount.password,
            });
        }
    };

    // 登录处理
    const handleLogin = async (values: LoginFormData) => {
        try {
            // 验证拖拽
            if (!isPassing) {
                setIsClickPass(true);
                return;
            }

            // 调用登录方法，它内部会处理API调用和状态设置
            await login({
                username: values.username,
                password: values.password,
                rememberPassword: values.rememberPassword,
            });

            // 显示成功提示
            setTimeout(() => {
                notification.success({
                    message: '登录成功',
                    description: `欢迎回来，Art Design Pro！`,
                    duration: 2.5,
                });
            }, 150);

            // 跳转到仪表板
            navigate('/dashboard');
        } catch (error) {
            console.error('登录失败:', error);
            message.error('登录失败，请检查用户名和密码');
        }
    };

    // 语言切换菜单
    const languageMenuItems: MenuProps['items'] = languageOptions.map((lang) => ({
        key: lang.value,
        label: (
            <div
                className={`flex items-center justify-between px-3 py-2 ${currentLanguage === lang.value ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : ''}`}
            >
                <span className="mr-2">{lang.label}</span>
                {currentLanguage === lang.value && <span>✓</span>}
            </div>
        ),
        onClick: () => setCurrentLanguage(lang.value),
    }));

    return (
        <div className="box-border flex w-full h-screen bg-white dark:bg-gray-900">
            <LoginLeftView />

            <div className="relative flex-1 h-full bg-white dark:bg-gray-900">
                {/* 顶部右侧工具栏 */}
                <div className="fixed top-6 right-8 z-50 flex items-center justify-end">
                    <div
                        className="inline-block p-2 ml-4 cursor-pointer select-none transition-all rounded-md text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900"
                        onClick={toggleTheme}
                    >
                        <BulbOutlined className="text-lg" />
                    </div>
                    <Dropdown menu={{ items: languageMenuItems }} placement="bottomRight">
                        <div className="inline-block p-2 ml-4 cursor-pointer select-none transition-all rounded-md text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900">
                            <GlobalOutlined className="text-lg" />
                        </div>
                    </Dropdown>
                </div>

                {/* 头部logo */}
                <div className="hidden">
                    <div className="text-5xl">🎨</div>
                    <h1>Art Design Pro</h1>
                </div>

                {/* 登录表单 */}
                <div className="absolute inset-0 w-110 h-152 px-1 mx-auto my-auto overflow-hidden rounded-md bg-cover opacity-100 animate-fade-in-right">
                    <div className="box-border h-full py-10 w-full">
                        <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 -ml-0.5">
                            用户登录
                        </h3>
                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                            欢迎登录 Art Design Pro 管理系统
                        </p>

                        <Form
                            form={form}
                            onFinish={handleLogin}
                            autoComplete="off"
                            className="mt-6"
                            initialValues={{
                                account: 'admin',
                                username: 'admin',
                                password: '123456',
                                rememberPassword: true,
                            }}
                        >
                            <Form.Item name="account">
                                <Select
                                    placeholder="选择预设账号"
                                    onChange={handleAccountChange}
                                    className="h-10"
                                >
                                    {accounts.map((account) => (
                                        <Option key={account.key} value={account.key}>
                                            {account.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: '请输入用户名' }]}
                            >
                                <Input placeholder="用户名" className="h-10" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码' }]}
                            >
                                <Input.Password
                                    placeholder="密码"
                                    autoComplete="off"
                                    className="h-10"
                                />
                            </Form.Item>

                            {/* 拖拽验证 */}
                            <div className="relative w-full pb-5 mt-6">
                                <div
                                    className={`relative z-10 box-border w-full overflow-hidden select-none border border-transparent rounded-lg transition-all ${
                                        !isPassing && isClickPass
                                            ? 'border-red-500 dark:border-red-400'
                                            : ''
                                    }`}
                                >
                                    <DragVerify
                                        value={isPassing}
                                        onChange={setIsPassing}
                                        text="请拖动滑块完成验证"
                                        successText="验证成功"
                                    />
                                </div>
                                <p
                                    className={`absolute top-0 z-0 px-0.5 mt-3 text-xs text-red-500 dark:text-red-400 transition-all opacity-0 ${
                                        !isPassing && isClickPass
                                            ? 'opacity-100 transform translate-y-10'
                                            : ''
                                    }`}
                                >
                                    请完成滑块验证
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-3 text-sm text-gray-500 dark:text-gray-400">
                                <Form.Item
                                    name="rememberPassword"
                                    valuePropName="checked"
                                    className="mb-0"
                                >
                                    <Checkbox>记住密码</Checkbox>
                                </Form.Item>
                                <a
                                    href="#"
                                    className="text-blue-500 dark:text-blue-400 no-underline hover:underline"
                                >
                                    忘记密码？
                                </a>
                            </div>

                            <div className="mt-8">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full h-10 text-white border-0"
                                    loading={loading}
                                >
                                    登录
                                </Button>
                            </div>

                            <div className="mt-5 text-sm text-gray-800 dark:text-gray-200 text-center">
                                <p>
                                    没有账号？
                                    <a
                                        href="#"
                                        className="text-blue-500 dark:text-blue-400 no-underline hover:underline"
                                    >
                                        立即注册
                                    </a>
                                </p>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
