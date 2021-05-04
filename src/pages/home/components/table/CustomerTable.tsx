/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

import { DeviceDTO } from '../../../../common/services/apiTypes';
import services from '../../../../common/services/services';

interface CustomerTable {
    key: string;
    name: string;
    email: string;
    sex: string;
    customerDevice: { id: string; device: DeviceDTO }[];
}

const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Sex', dataIndex: 'sex', key: 'sex' },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>Delete</a>,
    },
];

const ContentRow: React.FunctionComponent<{
    record: {
        id: string;
        device: DeviceDTO;
    };
}> = ({ record }) => (
    <div style={{ display: 'flex', justifyContent: 'space-around', marginLeft: 60 }}>
        <span>Name: {record.device.name}</span>
        <span>Ip: {record.device.ip}</span>
        <span>Status: {record.device.status}</span>
    </div>
);

const CustomerTable: React.FunctionComponent = () => {
    const [data, setData] = useState<CustomerTable[]>([]);

    const getListCustomer = async () => {
        try {
            const response = await services.getCustomers();
            if (response.data.rows.length) {
                const customers = response.data.rows.map((item) => {
                    return {
                        key: item.id,
                        name: item.firstName + ' ' + item.lastName,
                        email: item.email,
                        sex: item.sex,
                        customerDevice: item.customerDevice,
                    };
                });
                setData(customers);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getListCustomer();
    }, []);

    return (
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: (record: CustomerTable) =>
                    record.customerDevice.map((item, index) => <ContentRow record={item} key={index} />),
                rowExpandable: (record: any) => record.name !== 'Not Expandable',
            }}
            dataSource={data}
        />
    );
};

export default CustomerTable;
