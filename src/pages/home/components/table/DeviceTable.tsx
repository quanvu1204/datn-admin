/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

import services from '../../../../common/services/services';

interface DeviceTable {
    key: string;
    name: string;
    ip: string;
    status: string;
}

const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Ip', dataIndex: 'ip', key: 'ip' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>Delete</a>,
    },
];

const DeviceTable: React.FunctionComponent = () => {
    const [data, setData] = useState<DeviceTable[]>([]);

    const getListCustomer = async () => {
        try {
            const response = await services.getDevices();
            if (response.data.rows.length) {
                const devices = response.data.rows.map((item) => {
                    return {
                        key: item.id,
                        name: item.name,
                        ip: item.ip,
                        status: item.status,
                    };
                });
                setData(devices);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getListCustomer();
    }, []);

    return <Table columns={columns} dataSource={data} />;
};

export default DeviceTable;
