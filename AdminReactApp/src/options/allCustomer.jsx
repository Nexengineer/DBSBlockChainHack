import React from 'react';
import { Table, Tag } from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Public Hash',
        dataIndex: 'customerId',
        key: 'customerId',
    },
    {
        title: 'Email',
        dataIndex: 'emailAccount',
        key: 'emailAccount',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'OperationRegion',
        key: 'operationRegion',
        dataIndex: 'operationRegion',
        render: text => <Tag color ={text.length > 2 ? 'geekblue' : 'green'}>{text}</Tag>,
    }
];


class AllCustomers extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        axios.get(`http://localhost:5000/api/customer`)
        .then(res => {
          this.setState({ data: res.data });
        })
    }

    render() {
        return (
            <Table columns={columns} dataSource={this.state.data} />
        )
    }
}

export default AllCustomers;
