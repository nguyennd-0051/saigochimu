import React, { Component } from 'react';
import { Menu, Avatar, Dropdown, Button} from 'antd';
import { Link } from "react-router-dom";

import {
	DingtalkOutlined
} from '@ant-design/icons';
import './NavBar.css';

class NavBar extends Component {
	render() {
		return (
			<Menu theme="light" selectedKeys={[]} mode="horizontal" style={{ position: 'fixed', zIndex: 1, width: '100%', height: 50 }}>
				<Menu.Item key="index"><DingtalkOutlined />iDate</Menu.Item>
				{/*<Menu.Item key="create" style={{float: 'right'}}><EditOutlined />Create Post</Menu.Item>*/}
				{/*<Menu.Item key="profile" style={{float: 'right'}}><UserOutlined />My Profile</Menu.Item>*/}
			</Menu>
		);
	}
}
export default NavBar;

