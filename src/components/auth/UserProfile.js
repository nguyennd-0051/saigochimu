import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import { Layout, Descriptions} from 'antd';
import { Modal, Button, Space,  Tabs } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import NavBar from "../navbar/NavBar";
import { Table, Tag, Popconfirm } from 'antd';
import * as axios from 'axios';

const { TabPane } = Tabs;

const { Footer } = Layout;


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      orders: [],
      comboOrders: [],
      presentOrders: [],
      visible: false,
      tabPosition: "place",
    };

    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  componentDidMount() {
    
      axios.get('https://enigmatic-everglades-66523.herokuapp.com/api/order/getAll')
      .then(res => {
        console.log(res.data.orders)
        // if (this.state.userRole === "ROLE_ADMIN") {
          this.setState({ orders: res.data.orders })
        // }
      })
      .catch(error => console.log(error));

      axios.get('https://enigmatic-everglades-66523.herokuapp.com/api/comboOrder/getAll')
      .then(res => {
        console.log(res.data.orders)
          this.setState({ comboOrders: res.data.orders })
      })
      .catch(error => console.log(error));

      axios.get('https://enigmatic-everglades-66523.herokuapp.com/api/presentOrder/getAll')
      .then(res => {
        console.log(res.data.orders)
          this.setState({ presentOrders: res.data.orders })
      })
      .catch(error => console.log(error));
    
  }

  changeTabPosition = e => {
    this.setState({
        tabPosition: e,
    });
    console.log(this.state.tabPosition);
};

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleChangeStatus = (key) => {
    console.log(key)
    axios.put(`https://enigmatic-everglades-66523.herokuapp.com/api/order/updateStatus`, {orderID: key})
      .then(res => {
          console.log(res.data);
      window.location.reload(false);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChangeComboOrderStatus = (key) => {
    console.log(key)
    axios.put(`https://enigmatic-everglades-66523.herokuapp.com/api/comboOrder/updateStatus`, {orderID: key})
      .then(res => {
          console.log(res.data);
    window.location.reload(false);

      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      tabPosition: "combo"
    });
    
  };

  render() {
    const { currentUser } = this.state;

    var orderDataSource =[]

    if (this.state.orders !== null) this.state.orders.map((order, index) => {
      let customerInfo = 
      `Tên người đặt: ${order.name}; 
      Số điện thoại: ${order.phoneNumber}${"\n"};
      Số người tham gia: ${order.peopleNumber}`
      let information = `Tên địa điểm: ${order.placeName}${"\n"}Địa chỉ: ${order.placeAddress}${"\n"}Thời gian: ${order.date} 「${order.time}」`
      return orderDataSource.push({
        key: order._id,
        username: order.username,
        image: order.placeImage,
        customer: customerInfo,
        information: information,
        status: order.status,
        orderedAt: order.bookingAt
      })
    })

    var orderColumns = [
      {
        title: 'Tên người dùng',
        dataIndex: 'username',
        key: 'username',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Người đặt',
        dataIndex: 'customer',
        key: 'customer',
      },
      {
        title: "",
        dataIndex: 'image',
        key: 'image',
        width: 150,
        render: text => <img style={{width: '100%'}} src={text} alt="illustration" />
      },
      {
        title: 'Thông tin địa điểm',
        dataIndex: 'information',
        key: 'information',
      },
      {
        title: 'Thời gian đặt',
        dataIndex: 'orderedAt',
        key: 'orderedAt',
      },
      {
        title: 'Tình trạng',
        key: 'status',
        dataIndex: 'status',
        render: tag => 
          // <>
            {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'processing') {
                color = 'blue';
              }
              if (tag === 'successful') {
                color = 'green';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            }
          // </>
        ,
      },
      {
        title: 'Action',
        key: 'action',
        dataIndex: 'action',
        render: (text, record) => 
          orderDataSource.length >= 1 ? (
            <Popconfirm title="Sure to change?" onConfirm={() => this.handleChangeStatus(record.key)}>
              <a>Change Status</a>
            </Popconfirm>
          ) : null,
      },
    ];

    var comboOrderDataSource =[]

    if (this.state.comboOrders !== null) this.state.comboOrders.map((order, index) => {
      let customerInfo = 
      `Tên người đặt: ${order.name}; 
      Số điện thoại: ${order.phoneNumber}${"\n"};
      Số người tham gia: ${order.peopleNumber}`
      let information = `Combo số: ${order.comboID}${"\n"}`
      return comboOrderDataSource.push({
        key: order._id,
        username: order.username,
        customer: customerInfo,
        information: information,
        status: order.status,
        orderedAt: order.bookingAt
      })
    })

    var comboOrderColumns = [
      {
        title: 'Tên người dùng',
        dataIndex: 'username',
        key: 'username',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Người đặt',
        dataIndex: 'customer',
        key: 'customer',
      },
      {
        title: 'Thông tin combo',
        dataIndex: 'information',
        key: 'information',
      },
      {
        title: 'Thời gian đặt',
        dataIndex: 'orderedAt',
        key: 'orderedAt',
      },
      {
        title: 'Tình trạng',
        key: 'status',
        dataIndex: 'status',
        render: tag => 
          // <>
            {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'processing') {
                color = 'blue';
              }
              if (tag === 'successful') {
                color = 'green';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            }
          // </>
        ,
      },
      {
        title: 'Action',
        key: 'action',
        dataIndex: 'action',
        render: (text, record) => 
          comboOrderDataSource.length >= 1 ? (
            <Popconfirm title="Sure to change?" onConfirm={() => this.handleChangeComboOrderStatus(record.key)}>
              <a>Change Status</a>
            </Popconfirm>
          ) : null,
      },
    ];

    var presentOrderDataSource =[]

    if (this.state.presentOrders !== null) this.state.presentOrders.map((order, index) => {
      let customerInfo = 
      ` ${order.name}; 
      Số điện thoại: ${order.phoneNumber}${"\n"}`
      let receiverInfo = 
      ` ${order.receiverName}; 
      Số điện thoại: ${order.receiverNumber}${"\n"};
      Địa chỉ: ${order.receiverAddress}${"\n"}`
      let information = `${order.presentName}${"\n"}`
      return presentOrderDataSource.push({
        key: order._id,
        username: order.username,
        image: order.presentImage,
        customer: customerInfo,
        receiverInfo: receiverInfo,
        information: information,
        status: order.status,
        orderedAt: order.bookingAt
      })
    })

    var presentOrderColumns = [
      {
        title: 'Tên người dùng',
        dataIndex: 'username',
        key: 'username',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Người đặt',
        dataIndex: 'customer',
        key: 'customer',
      },
      {
        title: 'Người nhận',
        dataIndex: 'receiverInfo',
        key: 'receiverInfo',
      },
      {
        title: "",
        dataIndex: 'image',
        key: 'image',
        width: 150,
        render: text => <img style={{width: '100%'}} src={text} alt="illustration" />
      },
      {
        title: 'Loại quà tặng',
        dataIndex: 'information',
        key: 'information',
      },
      {
        title: 'Thời gian đặt',
        dataIndex: 'orderedAt',
        key: 'orderedAt',
      },
      {
        title: 'Tình trạng',
        key: 'status',
        dataIndex: 'status',
        render: tag => 
          // <>
            {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'processing') {
                color = 'blue';
              }
              if (tag === 'successful') {
                color = 'green';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            }
          // </>
        ,
      },
      {
        title: 'Action',
        key: 'action',
        dataIndex: 'action',
        render: (text, record) => 
          presentOrderDataSource.length >= 1 ? (
            <Popconfirm title="Sure to change?" onConfirm={() => this.handleChangeStatus(record.key)}>
              <a>Change Status</a>
            </Popconfirm>
          ) : null,
      },
    ];
    
    

    return (
      <>
      <NavBar
        currentPage={this.state.currentPage}
        onClickChangePage={this.onClickChangePage}
      />
      <Layout className="layout" style={{ background: "#fff", marginLeft: 50, marginRight: 50 }}>
        <div className="ml-auto mr-auto col-md-8" style={{margin: "auto", marginTop: 100, width: "50%" }}>
            
            <h1 style={{ textAlign: "center" }}><strong>{currentUser.username}</strong>'s Profile</h1>

            <div>
              <Descriptions bordered column={1}>
                  <Descriptions.Item label="User Name"><strong>{currentUser.username}</strong></Descriptions.Item>
                  <Descriptions.Item label="Email"><strong>{currentUser.email}</strong></Descriptions.Item>
                  <Descriptions.Item label="Role"><strong>{currentUser.roles}</strong></Descriptions.Item>
              </Descriptions>
            </div>
            
        </div>
        { currentUser.roles == 'ROLE_ADMIN' ? (
          <>
            <Tabs style={{ margin: "auto", marginTop: "7em", width: "70%" }} defaultActiveKey={this.state.tabPosition}  onChange={e => this.changeTabPosition(e)} centered>
              <TabPane tab="Đặt chỗ" key="palace">
                <Table columns={orderColumns} dataSource={orderDataSource} style={{ margin: "auto", marginTop: "2em"}}/>               
              </TabPane> 
              <TabPane tab="Combo" key="combo">
                <Table columns={comboOrderColumns} dataSource={comboOrderDataSource} style={{ margin: "auto", marginTop: "2em"}}/>             
              </TabPane>
              <TabPane tab="Quà tặng" key="present">
                <Table columns={presentOrderColumns} dataSource={presentOrderDataSource} style={{ margin: "auto", marginTop: "2em"}}/>         
              </TabPane> 
            </Tabs>
          </>
        ) : null}
      
      </Layout>

      {/* <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div> */}
      </>
    );
  }
}
