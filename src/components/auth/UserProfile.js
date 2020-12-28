import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import { Layout, Descriptions } from 'antd';
import { Tabs } from 'antd';
import NavBar from "../navbar/NavBar";
import { Table, Tag, PageHeader, Popconfirm } from 'antd';
import { UserOutlined, MailOutlined, CrownOutlined } from '@ant-design/icons';
import * as axios from 'axios';

const { TabPane } = Tabs;


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
        if (this.state.currentUser) {
            if (this.state.currentUser.roles === 'ROLE_ADMIN') {
                axios.get('https://enigmatic-everglades-66523.herokuapp.com/api/order/getAll')
                    .then(res => {
                        // console.log(res.data.orders)
                        // if (this.state.userRole === "ROLE_ADMIN") {
                        this.setState({ orders: res.data.orders })
                        // }
                    })
                    .catch(error => console.log(error));

                axios.get('https://enigmatic-everglades-66523.herokuapp.com/api/comboOrder/getAll')
                    .then(res => {
                        // console.log(res.data.orders)
                        this.setState({ comboOrders: res.data.orders })
                    })
                    .catch(error => console.log(error));

                axios.get('https://enigmatic-everglades-66523.herokuapp.com/api/presentOrder/getAll')
                    .then(res => {
                        // console.log(res.data.orders)
                        this.setState({ presentOrders: res.data.orders })
                    })
                    .catch(error => console.log(error));
            }

            else {
                axios.get(`https://enigmatic-everglades-66523.herokuapp.com/api/order/getAllOrderOfUser/${this.state.currentUser.id}`)
                    .then(res => {
                        // console.log(res.data.orders)
                        // if (this.state.userRole === "ROLE_ADMIN") {
                        this.setState({ orders: res.data.orders })
                        // }
                    })
                    .catch(error => console.log(error));

                axios.get(`https://enigmatic-everglades-66523.herokuapp.com/api/comboOrder/getAllOrderOfUser/${this.state.currentUser.id}`)
                    .then(res => {
                        // console.log(res.data.orders)
                        this.setState({ comboOrders: res.data.orders })
                    })
                    .catch(error => console.log(error));

                axios.get(`https://enigmatic-everglades-66523.herokuapp.com/api/presentOrder/getAllOrderOfUser/${this.state.currentUser.id}`)
                    .then(res => {
                        // console.log(res.data.orders)
                        this.setState({ presentOrders: res.data.orders })
                    })
                    .catch(error => console.log(error));
            }
        }

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
        axios.put(`https://enigmatic-everglades-66523.herokuapp.com/api/order/updateStatus`, { orderID: key })
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
        axios.put(`https://enigmatic-everglades-66523.herokuapp.com/api/comboOrder/updateStatus`, { orderID: key })
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

    handleChangePresentOrderStatus = (key) => {
        console.log(key)
        axios.put(`https://enigmatic-everglades-66523.herokuapp.com/api/presentOrder/updateStatus`, { orderID: key })
            .then(res => {
                console.log(res.data);
                window.location.reload(false);

            })
            .catch((err) => {
                console.log(err);
            });
        this.setState({
            tabPosition: "present"
        });

    };

    handleDeletePlaceOrder = (key) => {
        console.log(key)
        axios.put(`https://enigmatic-everglades-66523.herokuapp.com/api/order/delete`, { orderID: key })
            .then(res => {
                console.log(res.data);
                window.location.reload(false);

            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleDeleteComboOrder = (key) => {
        console.log(key)
        axios.put(`https://enigmatic-everglades-66523.herokuapp.com/api/comboOrder/delete`, { orderID: key })
            .then(res => {
                console.log(res.data);
                window.location.reload(false);

            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleDeletePresentOrder = (key) => {
        console.log(key)
        axios.put(`https://enigmatic-everglades-66523.herokuapp.com/api/presentOrder/delete`, { orderID: key })
            .then(res => {
                console.log(res.data);
                window.location.reload(false);

            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        const { currentUser } = this.state;




        var orderDataSource = []

        if (this.state.orders !== null) this.state.orders.map((order, index) => {
            let customerInfo =
                `Tên người đặt: ${order.name}${"\n"}Số điện thoại: ${order.phoneNumber}${"\n"}Số người tham gia: ${order.peopleNumber}`
            let information = `${order.placeName}${"\n"}${order.placeAddress}${"\n"}Thời gian: ${order.date} 「${order.time}」`
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
                render: text => <><a href="/#">{text}</a></>,
            },
            {
                title: 'Người đặt',
                dataIndex: 'customer',
                key: 'customer',
                width: 230,
            },
            {
                title: "",
                dataIndex: 'image',
                key: 'image',
                width: 150,
                render: text => <img style={{ width: '100%' }} src={text} alt="illustration" />
            },
            {
                title: 'Thông tin địa điểm',
                dataIndex: 'information',
                key: 'information',
                width: 300,
            },
            // {
            //   title: 'Thời gian đặt',
            //   dataIndex: 'orderedAt',
            //   key: 'orderedAt',
            //   width: 200,
            // },
            {
                title: 'Tình trạng',
                key: 'status',
                dataIndex: 'status',
                width: 150,
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
                title: '',
                key: 'action',
                dataIndex: 'action',
                render: (text, record) =>
                    orderDataSource.length >= 1 ? (
                        <>
                            {currentUser.roles == 'ROLE_ADMIN' && <Popconfirm title="Sure to change?" onConfirm={() => this.handleChangeStatus(record.key)}>
                                <a href="/#">Change Status</a>
                            </Popconfirm>}
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDeletePlaceOrder(record.key)}>
                                <a href="/#" style={{ marginLeft: "2em" }}>Hủy</a>
                            </Popconfirm>
                        </>
                    ) : null,
            },
        ];

        var comboOrderDataSource = []

        if (this.state.comboOrders !== null) this.state.comboOrders.map((order, index) => {
            let customerInfo =
                `Tên người đặt: ${order.name}${"\n"}Số điện thoại: ${order.phoneNumber}${"\n"}Số người tham gia: ${order.peopleNumber}`
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
                render: text => <a href="/#">{text}</a>,
            },
            {
                title: 'Người đặt',
                dataIndex: 'customer',
                key: 'customer',
                width: 230,
            },
            {
                title: 'Thông tin combo',
                dataIndex: 'information',
                key: 'information',
                width: 300,
            },
            {
                title: 'Thời gian đặt',
                dataIndex: 'orderedAt',
                key: 'orderedAt',
                width: 50,
            },
            {
                title: 'Tình trạng',
                key: 'status',
                dataIndex: 'status',
                width: 150,
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
                        <>
                            {currentUser.roles == 'ROLE_ADMIN' && <Popconfirm title="Sure to change?" onConfirm={() => this.handleChangeComboOrderStatus(record.key)}>
                                <a href="/#">Change Status</a>
                            </Popconfirm>}
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDeleteComboOrder(record.key)}>
                                <a href="/#" style={{ marginLeft: "2em" }}>Xóa</a>
                            </Popconfirm>
                        </>
                    ) : null,
            },
        ];

        var presentOrderDataSource = []

        if (this.state.presentOrders !== null) this.state.presentOrders.map((order, index) => {
            let customerInfo =
                `${order.name}${"\n"}Số điện thoại: ${order.phoneNumber}`
            let receiverInfo =
                `${order.receiverName}${"\n"}Số điện thoại: ${order.receiverPhoneNumber}${"\n"}Địa chỉ: ${order.receiverAddress}${"\n"}`
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
                render: text => <a href="/#">{text}</a>,
            },
            {
                title: 'Người đặt',
                dataIndex: 'customer',
                key: 'customer',
                width: 210,
            },
            {
                title: 'Người nhận',
                dataIndex: 'receiverInfo',
                key: 'receiverInfo',
                width: 250,
            },
            {
                title: "",
                dataIndex: 'image',
                key: 'image',
                width: 150,
                render: text => <img style={{ width: '100%' }} src={text} alt="illustration" />
            },
            {
                title: 'Loại quà tặng',
                dataIndex: 'information',
                key: 'information',
            },
            // {
            //     title: 'Thời gian đặt',
            //     dataIndex: 'orderedAt',
            //     key: 'orderedAt',
            //     width: 100,
            // },
            {
                title: 'Tình trạng',
                key: 'status',
                dataIndex: 'status',
                width: 150,
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
                title: '',
                key: 'action',
                dataIndex: 'action',
                render: (text, record) =>
                    presentOrderDataSource.length >= 1 ? (
                        <>
                            {currentUser.roles == 'ROLE_ADMIN' && <Popconfirm title="Sure to change?" onConfirm={() => this.handleChangePresenOrderStatus(record.key)}>
                                <a href="/#">Change Status</a>
                            </Popconfirm>}
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDeletePresentOrder(record.key)}>
                                <a href="/#" style={{ marginLeft: "2em" }}>Delete</a>
                            </Popconfirm>
                        </>
                    ) : null,
            },
        ];


        return (
            <>
                <NavBar
                    currentPage={this.state.currentPage}
                    onClickChangePage={this.onClickChangePage}
                />
                <Layout className="layout" style={{ background: "#ffd8bf" }}>
                    <div className="ml-auto mr-auto col-md-8" style={{ margin: "auto", marginTop: 100, width: "92.5%" }}>

                        <h1 style={{ textAlign: "center" }}>Trang cá nhân của <strong>{currentUser.username}</strong></h1>

                        <div>
                        <PageHeader
                            style={{
                                boxShadow: "5px 5px 20px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)",
                                margin: 20,
                                background: "#fff",
                                // height: "420px",
                            }}
                        >
                            <Descriptions title="Thông tin người dùng" >
                                <Descriptions.Item label=""><UserOutlined style={{ marginRight: "1em", fontSize: "1.5em" }}/><span style={{ marginRight: "1em" }}>Tên người dùng:</span><strong>{currentUser.username}</strong></Descriptions.Item>
                                <Descriptions.Item label=""><MailOutlined style={{ marginRight: "1em", fontSize: "1.5em" }}/><span style={{ marginRight: "1em" }}>Địa chỉ email:</span><strong>{currentUser.email}</strong></Descriptions.Item>
                                <Descriptions.Item label=""><CrownOutlined style={{ marginRight: "1em", fontSize: "1.5em" }}/><strong>{currentUser.roles}</strong></Descriptions.Item>
                            </Descriptions>
                        </PageHeader>
                        </div>

                    </div>
                    {(
                        <>
                            <PageHeader
                                title="Lịch sử đặt hàng"
                                style={{
                                    margin: "auto",
                                    boxShadow: "5px 5px 20px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)",
                                    background: "#fff",
                                    width: "90%",
                                    marginBottom: "2em"
                                    // height: "420px",
                                }}
                            >
                                <Tabs style={{ margin: "auto", width: "100%" }} defaultActiveKey={this.state.tabPosition} onChange={e => this.changeTabPosition(e)} centered>
                                    <TabPane tab="Đặt chỗ" key="palace">
                                        <Table columns={orderColumns} dataSource={orderDataSource} style={{ margin: "auto", marginTop: "2em", whiteSpace: 'pre' }} />
                                    </TabPane>
                                    <TabPane tab="Combo" key="combo">
                                        <Table columns={comboOrderColumns} dataSource={comboOrderDataSource} style={{ margin: "auto", marginTop: "2em", whiteSpace: 'pre' }} />
                                    </TabPane>
                                    <TabPane tab="Quà tặng" key="present">
                                        <Table columns={presentOrderColumns} dataSource={presentOrderDataSource} style={{ margin: "auto", marginTop: "2em", whiteSpace: 'pre' }} />
                                    </TabPane>
                                </Tabs>
                            </PageHeader>
                        </>
                    )}

                </Layout>
            </>
        );
    }
}
