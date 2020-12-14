import React from "react";
import NavBar from "../navbar/NavBar";
import "./PresentDetail.css";
import { Layout, Carousel, Descriptions, Rate, Button } from 'antd';
import * as axios from 'axios';

const { Footer } = Layout;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
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
      `https://enigmatic-everglades-66523.herokuapp.com/palace/${this.props.match.params.id}`
      //   `https://itss-2.herokuapp.com/palace/1`
    )
      .then(response => {
        this.setState({
          presentInfo: 'Need to replace to all info of present',
          item: {
            presentID: 'Need to replace to present ID',
            presentName: 'Need to replace to name present',
            presentAddress: 'Need to replace to present address',
            presentImage: 'Need to replace to present image link'
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
          <Carousel style={{ marginTop: 50 }} >
            <div>
              <img alt="place-ava" style={{ width: '100%' }} src={this.state.presentInfo.image}></img>
            </div>
          </Carousel>
          <div className="ml-auto mr-auto col-md-8" style={{ marginTop: 25 }}>

            <h1 style={{ textAlign: "center" }}>{this.state.presentInfo.name}</h1>

            <div>
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Địa chỉ">{this.state.presentInfo.address}</Descriptions.Item>
                <Descriptions.Item label="Thông tin chi tiết">{this.state.presentInfo.description}</Descriptions.Item>
                <Descriptions.Item label="Giá thành">{this.state.presentInfo.cost}</Descriptions.Item>
                <Descriptions.Item label="Đánh giá">
                  <Rate allowHalf defaultValue={0} value={this.state.presentInfo.vote} />
                </Descriptions.Item>
              </Descriptions>
            </div>

            <div style={{ margin: 25 }}>
              <h3 style={{ textAlign: "center" }}>Enjoy!</h3>
              <div style={{ textAlign: "center" }}>
                <Button type="primary" shape="round" size="large" onClick={this.showModal}>
                  Đặt chỗ
              </Button>
              </div>
            </div>
          </div>

          <Footer style={{ textAlign: 'center' }}> ©2020 魔法使い</Footer>
        </Layout>
      </>
    );
  }
}

export default PresentDetail;
