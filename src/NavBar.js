import React, { Component } from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  EditOutlined,
  GitlabOutlined,
} from '@ant-design/icons';

class NavBar extends Component {
  render() {
    return (
      <Menu theme="light" onClick={this.props.onClickChangePage} selectedKeys={[this.props.currentPage]} mode="horizontal" style={{ position: 'fixed', zIndex: 1, width: '100%', height: 50 }}>
        <Menu.Item key="index"><GitlabOutlined />My Blog</Menu.Item>
        <Menu.Item key="create" style={{float: 'right'}}><EditOutlined />Create Post</Menu.Item>
        <Menu.Item key="profile" style={{float: 'right'}}><UserOutlined />My Profile</Menu.Item>
      </Menu>
    );
  }
}

export default NavBar;

