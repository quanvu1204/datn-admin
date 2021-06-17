import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, Select, Alert, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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
    const [avatar, setAvatar] = useState('');
    useEffect(() => {
        if (currentUser) {
            form.setFieldsValue({
                email: currentUser.email,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                sex: currentUser.sex,
            });
            currentUser.avatar && setAvatar(`data:image/png;base64,${currentUser.avatar}`);
        }
    }, [currentUser]);

    useEffect(() => {
        if (!isModalVisible) {
            setAvatar('');
        }
    }, [isModalVisible]);

    const onFinish = async (values: any) => {
        if (currentUser) {
            const response = await services.updateCustomer({
                id: currentUser?.key,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                sex: values.sex,
                avatar: avatar.slice(avatar.indexOf(',') + 1),
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
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const getBase64 = (img: any, callback: any) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const handleChange = async (e: any) => {
        if (e) {
            getBase64(e.file.originFileObj, (imageUrl: string) => setAvatar(imageUrl));
        }
    };

    return (
        <Modal title="Chỉnh sửa người dùng" visible={isModalVisible} footer={null} onCancel={handleCancel}>
            {hasError && <Alert message="Có lỗi, hãy thử lại!" style={{ marginBottom: 20 }} type="error" />}
            <Form {...layout} name="basic" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="Avatar">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        onChange={handleChange}
                    >
                        {avatar ? (
                            <img
                                src={avatar}
                                alt="avatar"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Form.Item>
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
