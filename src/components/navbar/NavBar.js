import React, { Component } from 'react';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import { Link } from "react-router-dom";

import {
	DingtalkOutlined
} from '@ant-design/icons';
import './NavBar.css';

class NavBar extends Component {
	render() {
		return (
			<Menu theme="light" selectedKeys={[]} mode="horizontal" style={{ position: 'fixed', zIndex: 1, width: '100%', height: 50 }}>
				<Menu.Item key="index"><a href="/"><DingtalkOutlined />iDate</a></Menu.Item>
				<Menu.Item key="profile" style={{float: 'right'}}><a href="/myplaces"><UserOutlined />My Profile</a></Menu.Item>
			</Menu>
		);
	}
}
export default NavBar;

