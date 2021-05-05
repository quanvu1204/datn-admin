import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Dropdown } from 'antd';
import { PieChartOutlined, DownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import logo from '../../common/assets/images/logo.png';
import { storage } from '../../common/utils/storage';

import DeviceTable from './components/table/DeviceTable';
import CustomerTable from './components/table/CustomerTable';

const { Header, Content, Footer, Sider } = Layout;

const handleLogout = () => {
    storage.removeToken('token');
    window.location.reload();
};

const menu = (
    <Menu>
        <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
);

const Home: React.FunctionComponent = () => {
    const [collapse, setCollapse] = useState(false);
    const [tabActivated, setTabActivated] = useState(1);
    const onCollapse = () => {
        setCollapse(!collapse);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapse} onCollapse={onCollapse} style={{ textAlign: 'center' }}>
                <img className="logo" src={logo} style={{ width: 60, height: 60 }} />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item onClick={() => setTabActivated(1)} key="1" icon={<PieChartOutlined />}>
                        Customers
                    </Menu.Item>
                    <Menu.Item onClick={() => setTabActivated(2)} key="2" icon={<PieChartOutlined />}>
                        Devices
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0, display: 'flex', justifyContent: 'flex-end' }}
                >
                    <Dropdown overlay={menu}>
                        <a
                            className="ant-dropdown-link"
                            style={{ marginRight: 20 }}
                            onClick={(e) => e.preventDefault()}
                        >
                            beemadmin@assistant.com <DownOutlined />
                        </a>
                    </Dropdown>
                </Header>
                {tabActivated === 1 ? (
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Customers</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <CustomerTable />
                        </div>
                    </Content>
                ) : (
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Devices</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <DeviceTable />
                        </div>
                    </Content>
                )}
                <Footer style={{ textAlign: 'center' }}>©{dayjs().year()} Created by Beem Assistant</Footer>
            </Layout>
        </Layout>
    );
};

export default Home;
