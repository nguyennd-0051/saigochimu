import React from "react";
import NavBar from "../navbar/NavBar";
import "./PlaceDetail.css";
import { Layout, Carousel, Descriptions, Rate, Button } from 'antd';
import * as axios from 'axios'

const { Header, Content, Footer } = Layout;
class PlaceDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      palaceInfo: {},
    };
  }

  componentDidMount() {
    axios.get(
      `https://itss-2.herokuapp.com/palace/${this.props.match.params.id}`
    //   `https://itss-2.herokuapp.com/palace/1`
    )
      .then(response => {
        this.setState({ palaceInfo: response.data.allPalace });
        console.log(this.state.palaceInfo);
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
        {/* <Menu theme="light" onClick={this.onClickChangePage} selectedKeys={[this.state.currentPage]} mode="horizontal" style={{ position: 'fixed', zIndex: 1, width: '100%', height: 50 }}>
          <Menu.Item key="index"><GitlabOutlined />My Blog</Menu.Item>
          <Menu.Item key="create" style={{float: 'right'}}><EditOutlined />Create Post</Menu.Item>
          <Menu.Item key="profile" style={{float: 'right'}}><UserOutlined />My Profile</Menu.Item>
        </Menu> */}


        <Carousel style={{ marginTop: 50 }} >
            <div>
            <img style={{ width: '100%' }} src={this.state.palaceInfo.image}></img>
            </div>
        </Carousel>
        <div className="ml-auto mr-auto col-md-8" style={{ marginTop: 25 }}>
            <h1 className="text-center">{this.state.palaceInfo.name}</h1>

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

            <div className="text-center" style={{ margin: 25 }}>
            <h3>Enjoy!</h3>
            <Button type="primary" shape="round" size="large">
                Đặt chỗ
            </Button>
            </div>
        </div>

        <Footer style={{ textAlign: 'center' }}> ©2020 魔法使い</Footer>
      </Layout>
      </>
    );
  }
}

export default PlaceDetail;
