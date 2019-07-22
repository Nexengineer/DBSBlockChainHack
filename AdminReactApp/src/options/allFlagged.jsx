import React from 'react';
import 'antd/dist/antd.css'
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
                    color = 'orange';
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

class AllFlagged extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        axios.get(`http://localhost:5000/api/transaction`)
            .then(res => {
                var array = res.data
                var filterArray = array.filter(function (item) {
                    return item.status == "NeedApproval" || item.status == "Rejected"  ;
                });
                this.setState({ data: filterArray});
            })
    }

    render(){
        return(
            <Table columns={columns} dataSource={this.state.data} />
        )
    }
}

export default AllFlagged;