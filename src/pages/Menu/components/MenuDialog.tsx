import { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Switch, Radio, Row, Col } from 'antd';

import type { Permission } from '@/types/user';
import { PermissionType } from '@/types/enum';

interface MenuFormData {
    id: string;
    name: string;
    path: string;
    label: string;
    component: string;
    icon: string;
    sortValue: number;
    resourceType: PermissionType;
    frameSrc: string;
    hide: boolean;
    disabled: boolean;
}

interface MenuDialogProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (data: MenuFormData) => void;
    editData?: Permission | null;
    type?: 'menu' | 'button';
    lockType?: boolean;
}

const MenuDialog: React.FC<MenuDialogProps> = ({
    visible,
    onCancel,
    onSubmit,
    editData,
    type = 'menu',
    lockType = false,
}) => {
    const [form] = Form.useForm();
    const [menuType, setMenuType] = useState<'menu' | 'button'>(type || 'menu');
    const isEdit = !!editData;

    // 重置表单
    const resetForm = () => {
        form.resetFields();
    };

    // 加载表单数据
    const loadFormData = () => {
        if (editData) {
            form.setFieldsValue({
                id: editData.id,
                name: editData.name,
                path: editData.path,
                label: editData.label,
                component: editData.component,
                icon: editData.icon,
                sortValue: editData.sortValue,
                resourceType: editData.resourceType,
                frameSrc: editData.frameSrc,
                hide: editData.hide,
                disabled: editData.disabled,
            });
        }
    };

    // 处理提交
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onSubmit({
                ...values,
                id: editData?.id || Date.now().toString(),
                resourceType: menuType === 'menu' ? PermissionType.MENU : PermissionType.BUTTON,
            });
            resetForm();
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };

    // 监听弹窗状态变化
    useEffect(() => {
        if (visible) {
            setMenuType(type || 'menu');
            loadFormData();
        } else {
            resetForm();
        }
    }, [visible, editData, type]);

    const dialogTitle = `${isEdit ? '编辑' : '新建'}${menuType === 'menu' ? '菜单' : '权限'}`;

    return (
        <Modal
            title={dialogTitle}
            open={visible}
            onCancel={() => {
                onCancel();
                resetForm();
            }}
            onOk={handleSubmit}
            width={800}
            afterClose={resetForm}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    sortValue: 1,
                    resourceType: PermissionType.MENU,
                    hide: false,
                    disabled: false,
                }}
            >
                <Form.Item label="菜单类型" name="resourceType">
                    <Radio.Group
                        value={menuType}
                        onChange={(e) => setMenuType(e.target.value)}
                        disabled={isEdit || (menuType === 'menu' && lockType)}
                    >
                        <Radio.Button value="menu">菜单</Radio.Button>
                        <Radio.Button value="button">权限</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                {/* 菜单表单 */}
                {menuType === 'menu' && (
                    <>
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item
                                    label="菜单名称"
                                    name="label"
                                    rules={[{ required: true, message: '请输入菜单名称' }]}
                                >
                                    <Input placeholder="菜单名称" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="路由地址"
                                    name="path"
                                    rules={[{ required: true, message: '请输入路由地址' }]}
                                >
                                    <Input placeholder="路由地址" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item
                                    label="权限标识"
                                    name="name"
                                    rules={[{ required: true, message: '请输入权限标识' }]}
                                >
                                    <Input placeholder="权限标识" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="组件路径" name="component">
                                    <Input placeholder="组件路径" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item label="图标" name="icon">
                                    <Input placeholder="图标" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="排序" name="sortValue">
                                    <InputNumber style={{ width: '100%' }} min={1} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item label="外部链接" name="frameSrc">
                                    <Input placeholder="外部链接/内嵌地址(https://www.baidu.com)" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col span={6}>
                                <Form.Item label="是否隐藏" name="hide" valuePropName="checked">
                                    <Switch />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="是否禁用" name="disabled" valuePropName="checked">
                                    <Switch />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}

                {/* 权限表单 */}
                {menuType === 'button' && (
                    <>
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item
                                    label="权限名称"
                                    name="label"
                                    rules={[{ required: true, message: '请输入权限名称' }]}
                                >
                                    <Input placeholder="权限名称" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="权限标识"
                                    name="name"
                                    rules={[{ required: true, message: '请输入权限标识' }]}
                                >
                                    <Input placeholder="权限标识" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item label="权限排序" name="sortValue">
                                    <InputNumber style={{ width: '100%' }} min={1} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}
            </Form>
        </Modal>
    );
};

export default MenuDialog;
