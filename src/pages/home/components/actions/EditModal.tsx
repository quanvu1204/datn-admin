import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, Select, Alert } from 'antd';

import { CustomerTable } from '../table/CustomerTable';
import services from '../../../../common/services/services';

interface ModalProps {
    isModalVisible: boolean;
    setCurrentUser: (user: any) => void;
    currentUser?: CustomerTable;
    setIsModalVisible: (isModalVisible: boolean) => void;
    getListCustomer: () => void;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const EditModal: React.FunctionComponent<ModalProps> = ({
    isModalVisible,
    setCurrentUser,
    currentUser,
    setIsModalVisible,
    getListCustomer,
}) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (currentUser) {
            form.setFieldsValue({
                email: currentUser.email,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                sex: currentUser.sex,
            });
        }
    }, [currentUser]);

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        if (currentUser) {
            const response = await services.updateCustomer({
                id: currentUser?.key,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                sex: values.sex,
            });
            if (response.code === 200) {
                getListCustomer();
            } else {
                setHasError(true);
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleCancel = () => {
        setCurrentUser(undefined);
        setIsModalVisible(false);
    };

    const [form] = Form.useForm();

    return (
        <Modal title="Chỉnh sửa người dùng" visible={isModalVisible} footer={null} onCancel={handleCancel}>
            {hasError && <Alert message="Có lỗi, hãy thử lại!" style={{ marginBottom: 20 }} type="error" />}
            <Form {...layout} name="basic" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Email không được để trống!' }]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="Tên"
                    name="firstName"
                    rules={[{ required: true, message: 'Tên không được để trống!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Họ" name="lastName" rules={[{ required: true, message: 'Họ không được để trống!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Select" name="sex">
                    <Select>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">FeMale</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditModal;
