import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { sha256 } from 'js-sha256'

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    DatePicker,
    message
} from 'antd';
const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;



class AddCustomer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.icons = {
            mrp: <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />,
            name: <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />,
            brand: <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />,
            actual_price: <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />,
            quantity: <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />,
            billNo: <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />,
        };

        // this.confirmField = this.confirmField.bind(this);
        // this.checkForNumber = this.checkForNumber.bind(this);
    }

    handleRegionChanges = region => {
        if (!('value' in this.props)) {
            this.setState({ region: region });
        }
    };

    handleDateChange = (date, dateString) => {
        console.log(dateString)
        this.setState({
            dateSelected: dateString
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // Adding logic
                const privateHash = sha256(values.name.toLowerCase() + values.address.toLowerCase() + values.email.toLowerCase());
                const customerId = sha256(values.name.toLowerCase() + values.address.toLowerCase() + values.email.toLowerCase() + this.state.region + this.state.dateSelected);
                const user = {
                    name: values.name,
                    address: values.address,
                    emailAccount: values.email,
                    dob: this.state.dateSelected,
                    operationRegion: this.state.region,
                    privateHash: privateHash,
                    customerId: customerId,
                    balance: values.Balance
                };

                axios.post(`http://localhost:5000/api/customer`, { user })
                    .then(res => {
                        if (res.data.status === 500) {
                            message.error("customer already exists");
                        } else {
                            message.success("Customer added sucessfully");
                            console.log(res);
                            console.log(res.data);
                            // Reseting all the fields
                            this.props.form.resetFields()
                            this.setState({
                                region: "",
                                dateSelected: ""
                            })
                        }
                    }).catch(error =>{
                        message.error("A error occured");
                    })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        const { size } = this.props;
        const { state } = this;

        return (
            <Form layout="vertical" style={{ padding: 30 }} onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: 'Please enter the name.',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input prefix={this.icons.name} placeholder="Name" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('address', {
                        rules: [{
                            required: true, message: 'Please enter the address.',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input prefix={this.icons.brand} placeholder="Address" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{
                            required: true, message: 'Please enter the email.',
                        }, {
                            validator: this.checkForNumber,
                        }],
                    })(
                        <Input prefix={this.icons.mrp} placeholder="Email" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('Balance', {
                        rules: [{
                            required: true, message: 'Please enter the Balance.',
                        }, {
                            validator: this.checkForNumber,
                        }],
                    })(
                        <Input prefix={this.icons.mrp} placeholder="Balance" />
                    )}
                </Form.Item>
                <Form.Item label="Date of Birth">
                    {getFieldDecorator('datepicker', config)(<DatePicker style={{ width: '100%' }} onChange={this.handleDateChange} />)}
                </Form.Item>
                <Select
                    value={state.region}
                    size={size}
                    style={{ width: '100%' }}
                    placeholder='Please select region'
                    onChange={this.handleRegionChanges}
                >
                    <Option value="US">US</Option>
                    <Option value="SEA">SEA</Option>
                    <Option value="AUS">AUS</Option>
                    <Option value="INDIA">INDIA</Option>
                    <Option value="EU">EU</Option>
                    <Option value="GULF">GULFNATIONS</Option>
                </Select>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(AddCustomer);
