import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import { Layout, Carousel, Descriptions, Rate, Button, Modal, Form, Input, InputNumber, DatePicker, TimePicker, message } from 'antd';
import NavBar from "../navbar/NavBar";

const { Footer } = Layout;

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

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
              </Descriptions>
            </div>
            
        </div>
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
