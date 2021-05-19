/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import firebase from 'firebase';

import services from '../../../../common/services/services';

export const firebaseConfig = {
    apiKey: 'AIzaSyDSn-cNFh08Y9a9Dyh2Gaw4aYhDtQtPU6U',
    authDomain: 'beem-assistant.firebaseapp.com',
    databaseURL: 'https://beem-assistant-default-rtdb.firebaseio.com',
    projectId: 'beem-assistant',
    storageBucket: 'beem-assistant.appspot.com',
    messagingSenderId: '461158918323',
    appId: '1:461158918323:web:360aac9f14e9bc23c7e8c6',
    measurementId: 'G-KPG3X9JM89',
};

interface DeviceTable {
    key: string;
    name: string;
    ip: string;
}

const DeviceTable: React.FunctionComponent = () => {
    const [data, setData] = useState<DeviceTable[]>([]);

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleDelete = async (item: DeviceTable) => {
        await firebase
            .database()
            .ref(`/devices/${item.ip.split('.').join('-')}`)
            .remove();
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
