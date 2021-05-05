/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

import services from '../../../../common/services/services';

interface DeviceTable {
    key: string;
    name: string;
    ip: string;
}

const DeviceTable: React.FunctionComponent = () => {
    const [data, setData] = useState<DeviceTable[]>([]);

    const handleDelete = async (item: DeviceTable) => {
        const response = await services.delDevice(item.key);
        if (response.code === 200) {
            getListDevice();
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Ip', dataIndex: 'ip', key: 'ip' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (item: DeviceTable) => (
                <a
                    onClick={() => {
                        handleDelete(item);
                    }}
                >
                    Delete
                </a>
            ),
        },
    ];

    const getListDevice = async () => {
        try {
            const response = await services.getDevices();
            if (response.code === 200) {
                const devices = response.data.rows.map((item) => {
                    return {
                        key: item.id,
                        name: item.name,
                        ip: item.ip,
                    };
                });
                setData(devices);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getListDevice();
    }, []);

    return <Table columns={columns} dataSource={data} />;
};

export default DeviceTable;
