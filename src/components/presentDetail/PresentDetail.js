import React from "react";
import NavBar from "../navbar/NavBar";
import CommentAddBox from "../comment/CommentAddBox";

import "./PresentDetail.css";
import { Layout, Descriptions, Rate, Button, Modal, Form, Input, message } from 'antd';
import * as axios from 'axios';
import AuthService from "../../services/auth.service";
import { Link } from 'react-router-dom';


const { Footer } = Layout;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const BookForm = (handleEditName, handleEditPhoneNumber, handleEditReceiverName, handleEditReceiverAddress, handleEditReceiverPhoneNumber, handleOk) => {

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
          label="Tên người đặt"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="VD: Nga Valin" onChange={(e)=>handleEditName(e)}/>
        </Form.Item>
  
        <Form.Item
          label="Số điện thoại người đặt"
          name="phoneNumber"
          rules={[{ required: true }]}
        >
          <Input placeholder="VD: 0910000ko" onChange={(e)=>handleEditPhoneNumber(e)}/>
        </Form.Item>
  
        <Form.Item
          label="Tên người nhận"
          name="receiver"
          rules={[{ required: true }]}
        >
          <Input placeholder="VD: Đức" onChange={(e)=>handleEditReceiverName(e)}/>
        </Form.Item>
  
        <Form.Item
          label="Địa chỉ người nhận"
          name="receiverAddress"
          rules={[{ required: true }]}
        >
          <Input placeholder="VD: Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội" onChange={(e)=>handleEditReceiverAddress(e)}/>
        </Form.Item>
  
        <Form.Item
          label="Số điện thoại người nhận"
          name="receiverPhoneNumber"
          rules={[{ required: true }]}
        >
          <Input placeholder="VD: 0910000ko" onChange={(e)=>handleEditReceiverPhoneNumber(e)}/>
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
        name: "",
        phoneNumber: "",
        receiverName: "",
        receiverAddress: "",
        receiverPhoneNumber: "",
        presentID: "",
        presentName: "",
        presentImage: "",
        presentAddress: "",
        status: "processing",
        orderAt: "", 
      },
      currentUser: undefined,
      presentInfo: {},
      visible: false,
      comments: [],
      submitting: false,
      EdtValue: '',
    };

    this.handleEditName = this.handleEditName.bind(this);
    this.handleEditDate = this.handleEditReceiverName.bind(this);
    this.handleEditTime = this.handleEditReceiverAddress.bind(this);
    this.handleEditPhoneNumber = this.handleEditPhoneNumber.bind(this);
    this.handleEditPeopleNumber = this.handleEditReceiverPhoneNumber.bind(this);
  }

  componentDidMount() {
    axios.get(
      //Need to replace
      `https://enigmatic-everglades-66523.herokuapp.com/present/${this.props.match.params.id}`
      //   `https://itss-2.herokuapp.com/palace/1`
    )
      .then(response => {
        let item = this.state.item
        item.presentID = response.data.allPresent.id;
        item.presentName = response.data.allPresent.name;
        item.presentAddress = response.data.allPresent.shop;
        item.presentImage = response.data.allPresent.image;
        this.setState({
          presentInfo: response.data.allPresent,
          item: item,
        });
        console.log(this.state.presentInfo);
        console.log(this.props.match.params.id);
      })
      .catch(err => console.log(err));

      const user = AuthService.getCurrentUser();
	
      if (user) {
        let item = this.state.item
        item.username = user.username;
        item.userEmail = user.email;
        item.userID = user.id
        this.setState({
          currentUser: user,
          item: item,
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
    bookingData.bookingAt = Date().toLocaleString();

    axios.post(`https://enigmatic-everglades-66523.herokuapp.com/api/presentOrder/create`, bookingData)
      .then(res => {
        this.setState({ 
          item: {
            name: "",
            phoneNumber: "",
            receiverName: "",
            receiverAddress: "",
            receiverPhoneNumber: "",
            presentID: this.state.presentInfo.id,
            presentName: this.state.presentInfo.name,
            presentImage: this.state.presentInfo.image,
            presentAddress: this.state.presentInfo.address,
            userID: this.state.currentUser.id,
            username: this.state.currentUser.username,
            userEmail: this.state.currentUser.email,
            status: "processing",
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
    item.phoneNumber = e.target.value;
    this.setState({item: item});
  }
  
  handleEditReceiverName = e => {
    let item = this.state.item
    item.receiverName = e.target.value;
    this.setState({item: item});
  }

  handleEditReceiverAddress = e => {
    let item = this.state.item
    item.receiverAddress = e.target.value;
    this.setState({item: item});

  }
  
  handleEditReceiverPhoneNumber = e => {
    let item = this.state.item
    item.receiverPhoneNumber = e.target.value;
    this.setState({item: item});
  }

  handleAddCmtSubmit = () => {
    if (!this.state.EdtValue) {
      return;
    }

    if(!this.state.currentUser) {
      return;
    }

    this.setState({
      submitting: true,
    });

    let value = this.state.EdtValue;

    const CmtData = {
      userID: this.state.currentUser.id,
      username: this.state.currentUser.username,
      userEmail: this.state.currentUser.email,
      presentID: this.state.presentInfo.id,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv4Hviqmchu_hUMBjF-CWJaFVpNVbS05hI5w&usqp=CAU',
      content: value,
      datetime: Date().toLocaleString(),
    };

    axios.post(`https://enigmatic-everglades-66523.herokuapp.com/api/presentComment/create`, CmtData)
    .then(res => {
      console.log(res.data)
      this.setState({ 
        submitting: false,
        EdtValue: '',
      });
    })
    .catch((err) => {
      console.log(err);
      setTimeout(() => {
        message.error({ content: "Thất bại", key, duration: 2 });
      }, 200);
    });
  };

  handleChangeCmtTextBox = e => {
    this.setState({
      EdtValue: e.target.value,
    });
  };

  handleDeleteCmt = cmtid => {
    axios.put(`https://enigmatic-everglades-66523.herokuapp.com/api/presentComment/delete/${cmtid}`, { userID: this.state.currentUser.id })
      .then(res => {
          console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openMessage = () => {
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({ content: 'Loaded!', key, duration: 2 });
    }, 1000);
  };

  render() {
    // console.log(this.state.item);
    axios.get(
      `https://enigmatic-everglades-66523.herokuapp.com/api/presentComment/getAllCommentOfPresent/${this.props.match.params.id}`
    )
      .then(response => {
        let comments = [];
        response.data.comments.map((comment) => {
          let commentInstance = {
            author: comment.username,
            avatar: comment.avatar,
            content: comment.content,
            cmtid: comment._id,
            userid: comment.userID,
          };
          console.log(commentInstance);
          comments.push(commentInstance);
        });
        comments.reverse();
        this.setState({ 
          comments: comments,
        });
      })
      .catch(err => console.log(err));
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
                    Đặt quà
                </Button>
              </div>
              <Modal
                title="Đặt quà"
                visible={this.state.visible}
                onFinish={this.openMessage}
                onCancel={this.handleCancel}
                width={700}
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
                  e => this.handleEditReceiverName(e),
                  e => this.handleEditReceiverAddress(e),
                  e => this.handleEditReceiverPhoneNumber(e),
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
             </>) : (
             <>
              <div style={{ margin: "7em" }}>
                <h2 style={{ textAlign: "center" }}><Link to="/login">ĐĂNG NHẬP</Link> để đặt quà và đăng tải bình luận của bạn !</h2>
              </div>
             </>
             )}
             <h3>Bình luận</h3>
            <CommentAddBox
              comments = {this.state.comments}
              submitting = {this.state.submitting} 
              handleChange = {this.handleChangeCmtTextBox} 
              handleSubmit = {this.handleAddCmtSubmit} 
              handleDelete = {this.handleDeleteCmt}
              value = {this.state.EdtValue}
              currentUser = {this.state.currentUser}

            />
          </div>

          {/* <Footer style={{ textAlign: 'center' }}> ©2020 魔法使い</Footer> */}
          <Footer style={{ textAlign: 'center' }}> ©2020 魔法使い</Footer>
        </Layout>
      </>
    );
  }
}

export default PresentDetail;
