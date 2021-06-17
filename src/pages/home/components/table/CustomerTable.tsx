/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { Table, Modal, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { DeviceDTO } from '../../../../common/services/apiTypes';
import services from '../../../../common/services/services';
import defaultLogo from '../../../../common/assets/images/default.png';
import EditModal from '../actions/EditModal';

const { confirm } = Modal;
const { Search } = Input;

export interface CustomerTable {
    key: string;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    sex: string;
    avatar: string;
    customerDevice: { id: string; device: DeviceDTO }[];
}

const CustomerTable: React.FunctionComponent = () => {
    const [data, setData] = useState<CustomerTable[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState<CustomerTable>();
    const [dataSearched, setDataSearched] = useState<CustomerTable[] | undefined>(undefined);
    useEffect(() => {
        getListCustomer();
    }, []);

    useEffect(() => {
        if (currentUser) {
            setIsModalVisible(true);
        }
    }, [currentUser]);

    const getListCustomer = async () => {
        try {
            const response = await services.getCustomers();
            if (response.code === 200) {
                const customers = response.data.rows.map((item) => {
                    return {
                        key: item.id,
                        name: item.firstName + ' ' + item.lastName,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        email: item.email,
                        sex: item.sex,
                        avatar: item.avatar,
                        customerDevice: item.customerDevice,
                    };
                });
                setData(customers);
                setIsModalVisible(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const showDeleteConfirm = (item: CustomerTable) => {
        confirm({
            title: 'Bạn có muốn xoá người dùng này?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Không',
            onOk: async () => {
                const response = await services.delCustomer(item.key);
                if (response.code === 200) {
                    getListCustomer();
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (item: string) => (
                <img
                    style={{ borderRadius: '50%', height: 50, width: 50, objectFit: 'cover' }}
                    src={item ? `data:image/png;base64,${item}` : defaultLogo}
                />
            ),
        },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Sex', dataIndex: 'sex', key: 'sex' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (item: CustomerTable) => (
                <div>
                    <a
                        onClick={() => {
                            setCurrentUser(item);
                        }}
                        style={{ marginRight: 20 }}
                    >
                        Edit
                    </a>{' '}
                    <a
                        onClick={() => {
                            showDeleteConfirm(item);
                        }}
                        style={{ marginLeft: 20 }}
                    >
                        Delete
                    </a>
                </div>
            ),
        },
    ];

    const onSearch = (e: string) => {
        if (e) {
            const users = data.filter((item) => item.name.includes(e) || item.email.includes(e));
            setDataSearched(users);
        } else {
            setDataSearched(data);
        }
    };

    const ContentRow: React.FunctionComponent<{
        record: {
            id: string;
            device: DeviceDTO;
        };
    }> = ({ record }) => (
        <div style={{ display: 'flex', justifyContent: 'space-around', marginLeft: 60 }}>
            <span style={{ width: '30%' }}>Name: {record.device.name}</span>
            <span style={{ width: '30%' }}>Ip: {record.device.ip}</span>
            <span style={{ width: '30%' }}>Status: {record.device.status}</span>
        </div>
    );

    return (
        <>
            <Search
                placeholder="Tìm kiếm người dùng"
                allowClear
                enterButton="Search"
                style={{ width: '400px', marginBottom: 30 }}
                size="large"
                onSearch={onSearch}
            />
            <Table
                pagination={{ pageSize: 5 }}
                columns={columns}
                expandable={{
                    expandedRowRender: (record: CustomerTable) =>
                        record.customerDevice.map((item, index) => <ContentRow record={item} key={index} />),
                    rowExpandable: (record: any) => record.name !== 'Not Expandable',
                }}
                dataSource={dataSearched !== undefined ? dataSearched : data}
            />
            <EditModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                getListCustomer={getListCustomer}
            />
        </>
    );
};

export default CustomerTable;
