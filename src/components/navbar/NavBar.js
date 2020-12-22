import React, { Component } from 'react';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import SearchBar from '../searchBar/searchBar';
import AuthService from "../../services/auth.service";
import { Redirect, Link } from 'react-router-dom';

// import { Link } from "react-router-dom";

import {
	DingtalkOutlined
} from '@ant-design/icons';
import './NavBar.css';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);
	
		this.state = {
		  currentUser: undefined,
		};
	  }

	  componentDidMount() {
		const user = AuthService.getCurrentUser();
	
		if (user) {
		  this.setState({
			currentUser: user,
		  });
		}
	  }
	
	  logOut() {
		AuthService.logout();
		return <Redirect to="/home" />
	  }
	render() {
		const { currentUser } = this.state;
		return (
			<div>
				{/* <Menu theme="light" selectedKeys={[]} mode="horizontal" style={{ position: 'fixed', zIndex: 1, width: '100%', height: 50 }}> */}
					{/* <Menu.Item key="index"><a href="/"><DingtalkOutlined />iDate</a></Menu.Item> */}
					{currentUser ? (
						<Menu theme="light" selectedKeys={[]} mode="horizontal" style={{ position: 'fixed', zIndex: 1,fontSize:"1.3em", width: '100%', height: 50 }}>
							<Menu.Item key="index"><a href="/home"><DingtalkOutlined />iDate</a></Menu.Item>
							<Menu.Item key="logout" style={{float: 'right'}}><a href="/home" onClick={this.logOut}>Đăng xuất</a></Menu.Item>
							<Menu.Item key="profile" style={{float: 'right'}}><a href="/profile" ><UserOutlined style={{ fontSize:"1.3em"}}/>Trang cá nhân</a></Menu.Item>
						</Menu>
					) : (
						<Menu theme="light" selectedKeys={[]} mode="horizontal" style={{ position: 'fixed', zIndex: 1, fontSize:"1.3em", width: '100%', height: 50 }}>
							<Menu.Item key="index"><a href="/home"><DingtalkOutlined />iDate</a></Menu.Item>
							<Menu.Item key="logout" style={{float: 'right'}}><Link to="/register">Đăng ký</Link></Menu.Item>
							<Menu.Item key="profile" style={{float: 'right'}}><Link to="/login">Đăng nhập</Link></Menu.Item>
							</Menu>
					)}
					
				{/* </Menu> */}
				{/* <div className="search-bar" style={{
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
				</div> */}
			</div>
			
		);
	}
}
export default NavBar;

