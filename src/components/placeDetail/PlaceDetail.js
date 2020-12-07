import React from "react";
import NavBar from "../navbar/NavBar";
import "./PlaceDetail.css";
import { Layout, Carousel, Descriptions, Rate, Button, Modal, Form, Input, InputNumber, DatePicker, TimePicker, message } from 'antd';
import * as axios from 'axios';
import AuthService from "../../services/auth.service";


const { Footer } = Layout;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const BookForm = (handleEditName, handleEditPhoneNumber, handleEditTime, handleEditDate, handleEditPeopleNumber, handleOk) => {

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const validateMessages = {
    required: 'Hãy điền ${label}!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  return (
    <Form
      {...layout}
      name="basic"
      onFinish={(e)=>handleOk(e)}
      onFinishFailed={onFinishFailed}
      validateMessages={validateMessages}
    >
      <Form.Item
        label="Họ và tên"
        name="name"
        rules={[{ required: true }]}
      >
        <Input placeholder="VD: Nga Valin" onChange={(e)=>handleEditName(e)}/>
      </Form.Item>

      <Form.Item
        label="Số điện thoại"
        name="phoneNumber"
        rules={[{ required: true }]}
      >
        <Input placeholder="VD: 0910000ko" onChange={(e)=>handleEditPhoneNumber(e)}/>
      </Form.Item>

      <Form.Item 
        label="Thời gian" 
        style={{ marginBottom: 0 }} 
      >
        <Form.Item 
          name="time"
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} 
          rules={[{ required: true, message: 'Hãy chọn giờ!' }]} 
        >
          <TimePicker placeholder="Chọn giờ" onChange={(time, timeString)=>handleEditTime(time, timeString)}/>
        </Form.Item>
        <span
          style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
        >
          -
        </span>
        <Form.Item 
          // label="Ngày" 
          name="date"
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          rules={[{ required: true, message: 'Hãy chọn ngày!' }]}
        >
          <DatePicker placeholder="Chọn ngày" onChange={(date, dateString)=>handleEditDate(date, dateString)}/>
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="Số người"
        name="peopleNumber"
        rules={[{ required: true }]}
      >
        <InputNumber min={1} max={10} onChange={(e)=>handleEditPeopleNumber(e)}/>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button htmlType="submit" type="primary">
          Đặt ngay
        </Button>
      </Form.Item>
    </Form>
  );
};

const key = 'updatable';

class PlaceDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      item: {
        username: "",
        userPhoneNumber: "",
        time: "",
        date: "",
        peopleNumber: "",
        placeID: "",
        placeName: "",
        placeImage: "",
        placeAddress: "",
        currentUser: undefined,
      },
      palaceInfo: {},
      visible: false,
    };

    this.handleEditName = this.handleEditName.bind(this);
    this.handleEditDate = this.handleEditDate.bind(this);
    this.handleEditTime = this.handleEditTime.bind(this);
    this.handleEditPhoneNumber = this.handleEditPhoneNumber.bind(this);
    this.handleEditPeopleNumber = this.handleEditPeopleNumber.bind(this);
  }

  componentDidMount() {
    axios.get(
      `https://enigmatic-everglades-66523.herokuapp.com/palace/${this.props.match.params.id}`
    //   `https://itss-2.herokuapp.com/palace/1`
    )
      .then(response => {
        this.setState({ 
          palaceInfo: response.data.allPalace,
          item: {
            placeID: response.data.allPalace.id,
            placeName: response.data.allPalace.name,
            placeAddress: response.data.allPalace.address,
            placeImage: response.data.allPalace.image
          },
        });
        console.log(this.state.palaceInfo);
        console.log(this.props.match.params.id);
      })
      .catch(err => console.log(err));

    const user = AuthService.getCurrentUser();
	
      if (user) {
        this.setState({
        currentUser: user,
        });
      }
  }

  onClickChangePage = e => {
    this.setState({
      currentPage: e.key,
    });
  };

  //Modal handle function

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    // e.preventDefault();
    message.loading({ content: 'Đang tiến hành đặt chỗ...', key });
    const bookingData = this.state.item;

    axios.post(`https://enigmatic-everglades-66523.herokuapp.com/palace/${this.props.match.params.id}/book`, bookingData)
      .then(res => {
        this.setState({ 
          item: {
            username: "",
            userPhoneNumber: "",
            time: "",
            date: "",
            peopleNumber: "",
            placeID: this.state.palaceInfo.id,
            placeName: this.state.palaceInfo.name,
            placeImage: this.state.palaceInfo.image,
            placeAddress: this.state.palaceInfo.address,
            bookingAt: Date().toLocaleString(),
          }, 
        });
        if (res.data.success === 1) {
          setTimeout(() => {
            message.success({ content: 'Bạn đã đặt thành công!', key, duration: 2 });
          }, 200);
          this.setState({
            visible: false,
          });
        }
        else {
          setTimeout(() => {
            message.error({ content: 'Đã xảy ra lỗi, vui lòng thử lại!', key, duration: 2 });
          }, 200);
        }
      })
      .catch(err => console.log(err));

  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleEditName = e => {
    let item = this.state.item
    item.name = e.target.value;
    this.setState({item: item});
  }

  handleEditPhoneNumber = e => {
    let item = this.state.item
    item.phone_number = e.target.value;
    this.setState({item: item});
  }
  
  handleEditTime = (time, timeString) => {
    let item = this.state.item
    item.time = timeString;
    this.setState({item: item});

  }

  handleEditDate = (date, dateString) => {
    let item = this.state.item
    item.date = dateString;
    this.setState({item: item});

  }
  
  handleEditPeopleNumber = e => {
    let item = this.state.item
    item.people_number = e;
    this.setState({item: item});
  }

  

  openMessage = () => {
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({ content: 'Loaded!', key, duration: 2 });
    }, 1000);
  };
  


  render() {
    // const key = 'updatable';
    return (
        <>
        <NavBar
        currentPage={this.state.currentPage}
        onClickChangePage={this.onClickChangePage}
      />
        <Layout className="layout" style={{ background: "#fff", marginLeft: 50, marginRight: 50 }}>
        {/* <Menu theme="light" onClick={this.onClickChangePage} selectedKeys={[this.state.currentPage]} mode="horizontal" style={{ position: 'fixed', zIndex: 1, width: '100%', height: 50 }}>
          <Menu.Item key="index"><GitlabOutlined />My Blog</Menu.Item>
          <Menu.Item key="create" style={{float: 'right'}}><EditOutlined />Create Post</Menu.Item>
          <Menu.Item key="profile" style={{float: 'right'}}><UserOutlined />My Profile</Menu.Item>
        </Menu> */}


        <Carousel style={{ marginTop: 50 }} >
            <div>
            <img alt="place-ava" style={{ width: '100%' }} src={this.state.palaceInfo.image}></img>
            </div>
        </Carousel>
        <div className="ml-auto mr-auto col-md-8" style={{ marginTop: 25 }}>
            
            <h1 style={{ textAlign: "center" }}>{this.state.palaceInfo.name}</h1>

            <div>
              <Descriptions bordered column={1}>
                  <Descriptions.Item label="Địa chỉ">{this.state.palaceInfo.address}</Descriptions.Item>
                  <Descriptions.Item label="Thông tin chi tiết">{this.state.palaceInfo.description}</Descriptions.Item>
                  <Descriptions.Item label="Giá thành">{this.state.palaceInfo.cost}</Descriptions.Item>
                  <Descriptions.Item label="Đánh giá">
                      <Rate allowHalf defaultValue={0} value={this.state.palaceInfo.vote} />
                  </Descriptions.Item>
              </Descriptions>
            </div>
            {this.state.currentUser ? (<>
              <div style={{ margin: 25 }}>
              <h3 style={{ textAlign: "center" }}>Enjoy!</h3>
              <div style={{ textAlign: "center" }}>
                <Button type="primary" shape="round" size="large" onClick={this.showModal}>
                    Đặt chỗ
                </Button>
              </div>
              <Modal
                title="Đặt chỗ"
                visible={this.state.visible}
                onFinish={this.openMessage}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="return" onClick={this.handleCancel }>
                    Quay lại
                  </Button>,
                  // <Button key="submit" type="primary" onClick={this.handleOk}>
                  //   Đặt ngay
                  // </Button>,
                ]}
              >
                {BookForm(
                  e => this.handleEditName(e),
                  e => this.handleEditPhoneNumber(e),
                  (time, timeString) => this.handleEditTime(time, timeString),
                  (date, dateString) => this.handleEditDate(date, dateString),
                  e => this.handleEditPeopleNumber(e),
                  e => this.handleOk(e)
                )}

                {/* <BookForm
                  handleEditName = {e => this.handleEditName(e)}
                  handleEditPhoneNumber = {e => this.handleEditPhoneNumber(e)}
                  handleEditTime = {e => this.handleEditTime(e)}
                  handleEditDate = {e => this.handleEditDate(e)}
                  handleEditPeopleNumber = {e => this.handleEditPeopleNumber(e)}

                >

                </BookForm> */}
              </Modal>
            </div>
             </>) : null}
            
        </div>

        <Footer style={{ textAlign: 'center' }}> ©2020 魔法使い</Footer>
      </Layout>
      </>
    );
  }
}

export default PlaceDetail;
