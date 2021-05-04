import React, { useEffect } from 'react';
import { Table } from 'antd';

import services from '../../../../common/services/services';

const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        // eslint-disable-next-line react/display-name
        render: () => <a>Delete</a>,
    },
];

const data = [
    {
        key: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
        key: 3,
        name: 'Not Expandable',
        age: 29,
        address: 'Jiangsu No. 1 Lake Park',
        description: 'This not expandable',
    },
    {
        key: 4,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
];
const CustomerTable: React.FunctionComponent = () => {
    const getListCustomer = async () => {
        try {
            const customers = await services.getCustomer();
            console.log(customers.data.rows);
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
                // eslint-disable-next-line react/display-name
                expandedRowRender: (record: any) => <p style={{ margin: 0 }}>{record.description}</p>,
                rowExpandable: (record: any) => record.name !== 'Not Expandable',
            }}
            dataSource={data}
        />
    );
};

export default CustomerTable;
