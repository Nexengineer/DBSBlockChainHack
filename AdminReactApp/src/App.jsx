import React from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import 'antd/dist/antd.css'

// Call all the classes
import AllCustomers from './options/allCustomer';
import AddCustomers from './options/addCustomer';
import AllFlagged from './options/allFlagged';
import AllTranscation from './options/allTranscation';


const { Header, Content, Footer, Sider } = Layout;
class App extends React.Component {
  // This the constructor
  constructor(props) {
    super(props)
    this.state = {
      showLogin: true,
      headerText: "New User",
      selectedIndex: "1"
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let password = prompt("Please provide your password");
    if (password == "") {
      alert("To login refresh the page !!!!")
    } else {
      alert("You Are logged in now !!!!")
    }
  }

  // On press of login
  changeLoginFlag = () => {
    this.setState({
      showLogin: false,
    })
  }

  // Handle Click event
  handleClick = e => {
    let titleText = "random"
    switch (e.key) {
      case "1":
        titleText = "New User"
        break;
      case "2":
        titleText = "View All Customers"
        break;
      case "3":
        titleText = "Monitor Transcations"
        break;
      case "4":
        titleText = "View All Flagged Trascations"
        break;
      default:
        break;
    }
    this.setState({
      headerText: titleText,
      selectedIndex: e.key
    });
  }

  // Switching between the Views
  renderSwitch = (params) => {
    console.log(typeof(params))
    switch (params) {
      case "1":
        return <AddCustomers/>;
      case "2":
        return <AllCustomers/>;
      case "3":
        return <AllTranscation/>;
      case "4":
        return <AllFlagged/>;
      default:
        return 'Undefined';
    }
  }

  render() {
    return (
      <div>
        <div style={{ background: '#ffff', padding: 0, marginTop: 0, alignItems: 'center' }}>
          <h3 style={{ paddingLeft: 20, fontSize: 30, marginTop: 20 }}>Bank Security Portal</h3>
        </div>
        <Layout style={{ minHeight: '80vh' }}>
          <Sider>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.handleClick}>
              <Menu.Item key="1">
                <Icon type="plus" />
                <span>Create New User</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="contacts" />
                <span>All Customers</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="database" />
                <span>Monitor Transcations</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="close-square" style={{ backgroundColor: 'red' }} />
                <span>Flagged Transcations</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ justifyContent: 'center', alignItems: 'center' }}>
              <h3 style={{ fontSize: 20, color: 'white' }}>{this.state.headerText}</h3>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              {this.renderSwitch(this.state.selectedIndex)}
            </Content>
            <Footer style={{ textAlign: 'center' }}></Footer>
          </Layout>
        </Layout >
      </div>
    )
  }
}

export default App;
