import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Table, Tag } from 'antd';

const columns = [
    {
        title: 'Transcation Hash',
        dataIndex: 'transactionId',
        key: 'transactionId',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Is Secure',
        key: 'status',
        dataIndex: 'status',
        render: ((text) => {
            let color;
            switch (text) {
                case "Secure":
                    color = 'green';
                    break;
                case "NeedApproval":
                    color = 'yellow';
                    break;
                case "Rejected":
                    color = 'red';
                    break;
                default:
                    color = 'geekblue'
                    break
            }
            return (
                <Tag color={color}>
                    <h1 style={{color: 'black'}}>{text}</h1>
                </Tag>
            )
        })
    }
];

class AllTranscation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        axios.get(`http://localhost:5000/api/transaction`)
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

export default AllTranscation;