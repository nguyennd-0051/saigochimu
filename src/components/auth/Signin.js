import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Layout, notification } from 'antd';
import { Redirect } from 'react-router-dom';
import axios from "axios"
import '../../App.css'
import NavBar from "../navbar/NavBar";
// import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";

const { Content } = Layout;

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
};
const tailLayout1 = {
  wrapperCol: { offset: 16, span: 16 },
};

class Signin extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
      loggedIn: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
		const user = AuthService.getCurrentUser();
	
		if (user) {
		  this.setState({
			loggedIn: true,
		  });
		}
	}

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    // this.form.validateAll();

    // if (this.checkBtn.context._errors.length === 0) 
    {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.setState({
            loggedIn: true
        });
        notification.open({
          type: 'success',
          message: 'Success',
          description: 'You are logged in!',
          duration: 5
      });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
          notification.open({
            type: 'error',
            message: 'Incorrect username or password.',
            description: 'Please try again',
            duration: 5
        });
        }
      );
    } 
    console.log(this.state.loggedIn)
    // else {
    //   this.setState({
    //     loading: false
    //   });
    // }
  }
  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/home" />
    }
        return (
          <>
            {/* <Layout className="layout"> */}
                <NavBar />
                <Layout className="layout" style={{ background: "#fff", marginLeft: 50, marginRight: 50 }}>
                {/* <Content className='main'> */}
                    <div className="site-layout-content" style={{width: "30%", marginTop: 100 }}>
                        <Form
                            {...layout}
                            name="basic"
                            onFinish={e => this.handleLogin(e)}
                            ref={c => {
                              this.form = c;
                            }}
                        >
                            <h1 style={{textAlign: "center"}}>WELCOME TO IDATE</h1>
                            <br/>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input onChange={e => this.onChangeUsername(e)} />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password onChange={e => this.onChangePassword(e)} />
                            </Form.Item>

                            {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                <Checkbox ref={c => {
                                    this.checkBtn = c;
                                }}>Remember me</Checkbox>
                            </Form.Item> */}
                            <Form.Item {...tailLayout}>
                              <Button type="primary" htmlType="submit" onClick={e => this.handleLogin(e)}>
                                Submit
                              </Button>
                              <Button type="link" htmlType="button" href="/register" style={{marginLeft: 55 }}>
                               Register
                            </Button>
                            </Form.Item>
                          
                        </Form>
                    </div>
                {/* </Content> */}

            </Layout>
            </>
        );
    }
}

export default Signin;
