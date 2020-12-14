import React from "react";
import NavBar from "../navbar/NavBar";
import "./PresentDetail.css";
import { Layout, Carousel, Descriptions, Rate, Button, Modal, Form, Input, InputNumber, DatePicker, TimePicker, message } from 'antd';
import * as axios from 'axios';

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

class PresentDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      item: {
        username: "",
        userPhoneNumber: "",
        time: "",
        date: "",
        peopleNumber: "",
        presentID: "",
        presentName: "",
        presentImage: "",
        presentAddress: "",
      },
      presentInfo: {},
      visible: false,
    };
  }

  componentDidMount() {
    axios.get(
      //Need to replace
      `https://enigmatic-everglades-66523.herokuapp.com/present/${this.props.match.params.id}`
      //   `https://itss-2.herokuapp.com/palace/1`
    )
      .then(response => {
        this.setState({
          presentInfo: response.data.allPresent,
          item: {
            presentID: response.data.allPresent.id,
            presentName: response.data.allPresent.name,
            presentAddress: response.data.allPresent.shop,
            presentImage: response.data.allPresent.image
          },
        });
        console.log(this.state.presentInfo);
        console.log(this.props.match.params.id);
      })
      .catch(err => console.log(err));
  }

  onClickChangePage = e => {
    this.setState({
      currentPage: e.key,
    });
  };

  render() {
    return (
      <>
        <NavBar
          currentPage={this.state.currentPage}
          onClickChangePage={this.onClickChangePage}
        />
        <Layout className="layout" style={{ background: "#fff", marginLeft: 50, marginRight: 50 }}>
          {/* <Carousel style={{ marginTop: 50 }} > */}
            <div style={{width: '15%', margin: "auto", marginTop: "6em" }}>
              <img alt="place-ava" style={{ width: '100%'}} src={this.state.presentInfo.image}></img>
            </div>
          {/* </Carousel> */}
          <div className="ml-auto mr-auto col-md-8" style={{ marginTop: 25 }}>

            <h1 style={{ textAlign: "center" }}>{this.state.presentInfo.name}</h1>

            <div>
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Cửa hàng">{this.state.presentInfo.shop}</Descriptions.Item>
                <Descriptions.Item label="Thông tin chi tiết">{this.state.presentInfo.description}</Descriptions.Item>
                <Descriptions.Item label="Giá thành">{this.state.presentInfo.cost}đ</Descriptions.Item>
                <Descriptions.Item label="Đánh giá">
                  <Rate allowHalf defaultValue={0} value={this.state.presentInfo.vote} />
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

          {/* <Footer style={{ textAlign: 'center' }}> ©2020 魔法使い</Footer> */}
        </Layout>
      </>
    );
  }
}

export default PresentDetail;
