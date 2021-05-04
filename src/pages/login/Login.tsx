import React from 'react';
import { Form, Input, Button, Row, Col, notification } from 'antd';

import { storage } from '../../common/utils/storage';
import services from '../../common/services/services';

import './LoginStyles.scss';

const Login: React.FunctionComponent = () => {
    const tailLayout = {
        wrapperCol: { offset: 9, span: 18 },
    };

    const onFinish = async (values: any) => {
        try {
            const response = await services.login(values);
            if (response.code === 200 && response.data?.token) {
                storage.setToken(response.data?.token, 'token');
                return window.location.reload();
            }
            return notification.error({
                message: 'Lỗi',
                description: 'Vui lòng thử lại!',
                duration: 2,
            });
        } catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng thử lại!',
                duration: 2,
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row>
            <Col span={8} offset={8}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="form-login"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default Login;
