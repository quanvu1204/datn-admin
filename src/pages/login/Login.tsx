import React from 'react';
import { Form, Input, Button, Row, Col, notification } from 'antd';

import logo from '../../common/assets/images/logo.png';
import { storage } from '../../common/utils/storage';
import services from '../../common/services/services';

import './LoginStyles.scss';

const Login: React.FunctionComponent = () => {
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
            <Col span={8} offset={8} style={{ textAlign: 'center', marginTop: 50 }}>
                <img className="logo" src={logo} style={{ width: 200, height: 200 }} />
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
                    <Form.Item>
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
