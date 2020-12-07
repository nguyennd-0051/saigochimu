import React, { Component } from 'react';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import SearchBar from '../searchBar/searchBar'
// import { Link } from "react-router-dom";

import {
	DingtalkOutlined
} from '@ant-design/icons';
import './NavBar.css';

class NavBar extends Component {
	render() {
		return (
			<div>
				<Menu theme="light" selectedKeys={[]} mode="horizontal" style={{ position: 'fixed', zIndex: 1, width: '100%', height: 50 }}>
					<Menu.Item key="index"><a href="/"><DingtalkOutlined />iDate</a></Menu.Item>
					<Menu.Item key="profile" style={{float: 'right'}}><a href="/myplaces"><UserOutlined />My Profile</a></Menu.Item>
				</Menu>
				<div className="search-bar" style={{
					width:"50%", 
					margin: "auto", 
					marginBottom: "2em",
					position: "fixed",
					"z-index": "99999",
					top: "0.5%",
					left: "25%" }}>
					<SearchBar 
						value={this.props.query}
						handleSearch={this.props.handleSearch}
					>
					</SearchBar>
				</div>
			</div>
			
		);
	}
}
export default NavBar;

