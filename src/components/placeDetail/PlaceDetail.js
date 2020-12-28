import React from "react";
import NavBar from "../navbar/NavBar";
import CommentAddBox from "../comment/CommentAddBox";
import "./PlaceDetail.css";
import { Layout, Carousel, Descriptions, Rate, Button, Modal, Form, Input, InputNumber, DatePicker, TimePicker, message } from 'antd';
import * as axios from 'axios';
import AuthService from "../../services/auth.service";
import { Link } from 'react-router-dom';
import moment from 'moment';



const { Footer } = Layout;

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

const BookForm = (handleEditName, handleEditPhoneNumber, handleEditTime, handleEditDate, handleEditPeopleNumber, handleOk, item) => {

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	const validateMessages = {
		required: 'Hãy điền ${label}!',
		types: {
			email: '${label} không hợp lệ!',
			number: '${label} không hợp lệ!',
		},
		number: {
			range: '${label} phải nằm trong khoảng từ ${min} đến ${max}',
		},
	};

	return (
		<Form
			{...layout}
			name="basic"
			onFinish={(e) => handleOk(e)}
			onFinishFailed={onFinishFailed}
			validateMessages={validateMessages}
		>
			<Form.Item
				label="Họ và tên"
				name="name"
				rules={[{ min: 8, message: 'Tên gồm 8 ký tự trở lên' }, { required: true }]}
			>
				<Input placeholder="VD: Nga Valin" onChange={(e) => handleEditName(e)} />
			</Form.Item>

			<Form.Item
				label="Số điện thoại"
				name="phoneNumber"
				rules={[{ min: 8, message: 'Số điện thoại gồm 8 ký tự trở lên' }, { required: true }]}
			>
				<Input placeholder="VD: 0978380998" onChange={(e) => handleEditPhoneNumber(e)} value={item.phoneNumber}/>
			</Form.Item>

			<Form.Item
				label="Thời gian"
				style={{ marginBottom: 0 }}
			>
				<Form.Item
					// label="Ngày" 
					name="date"
					style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
					rules={[
						{ required: true, message: 'Hãy chọn ngày!' },
						({ getFieldValue }) => ({
							validator(rule, value) {
								let today = new Date();
								let currentTime = today.getTime();	
								if (!value || value._d.getTime() >= currentTime - today.getHours()*60*60*1000 - today.getMinutes()*60*1000 - today.getSeconds()*1000 - today.getMilliseconds()) {
									return Promise.resolve();
								}
								return Promise.reject('Ngày không hợp lệ!');
							},
					  	}),
					]}
				>
					<DatePicker placeholder="Chọn ngày" onChange={(date, dateString) => handleEditDate(date, dateString)} />
				</Form.Item>
				<span
					style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
				>
					-
        		</span>
				<Form.Item
					name="time"
					style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
					rules={[
						{ required: true, message: 'Hãy chọn giờ!' },
						({ getFieldValue }) => ({
							validator(rule, value) {
							let today = new Date();	
							if(value) {
								if (value._d.getHours() < 9 || value._d.getHours() > 20) {
									return Promise.reject('Thời gian mở cửa là từ 9h đến 20h!');
								}
							}
							if (!value || getFieldValue('date')._d.getDate() > value._d.getDate()) {
								return Promise.resolve();
							}	
							if (!value || value._d.getTime()/60000 >= today.getTime()/60000 + 30) {
								return Promise.resolve();
							}
							return Promise.reject('Thời gian đặt là sau 30 phút từ thời điểm hiện tại!');
							},
						}),
					]}
				>
					<TimePicker placeholder="Chọn giờ" onChange={(time, timeString) => handleEditTime(time, timeString)} />
				</Form.Item>
				
			</Form.Item>

			<Form.Item
				label="Số người"
				name="peopleNumber"
				rules={[{ required: true }]}
			>
				<InputNumber min={1} max={10} onChange={(e) => handleEditPeopleNumber(e)} />
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

class PlaceDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			item: {
				name: "",
				phoneNumber: "",
				time: "",
				date: "",
				peopleNumber: "",
				placeID: "",
				placeName: "",
				placeImage: "",
				placeAddress: "",
				userID: "",
				username: "",
				userEmail: "",
				bookingAt: "",
				status: "processing",

			},
			currentUser: undefined,
			palaceInfo: {},
			visible: false,
			comments: [],
			submitting: false,
			EdtValue: '',
		};

		this.handleEditName = this.handleEditName.bind(this);
		this.handleEditDate = this.handleEditDate.bind(this);
		this.handleEditTime = this.handleEditTime.bind(this);
		this.handleEditPhoneNumber = this.handleEditPhoneNumber.bind(this);
		this.handleEditPeopleNumber = this.handleEditPeopleNumber.bind(this);
	}

	componentDidMount() {
		axios.get(
			`https://enigmatic-everglades-66523.herokuapp.com/palace/${this.props.match.params.id}`
			//   `https://itss-2.herokuapp.com/palace/1`
		)
			.then(response => {
				let item = this.state.item
				item.placeID = response.data.allPalace.id;
				item.placeName = response.data.allPalace.name;
				item.placeAddress = response.data.allPalace.address;
				item.placeImage = response.data.allPalace.image;
				this.setState({
					palaceInfo: response.data.allPalace,
					item: item,
				});
				console.log(this.state.palaceInfo);
				console.log(this.props.match.params.id);
			})
			.catch(err => console.log(err));

		// axios.get(
		//   `http://localhost:8000/api/comment/getAllCommentOfPlace/${this.props.match.params.id}`
		// )
		//   .then(response => {
		//     let comments = [];
		//     response.data.comments.map((index, comment) => {
		//       let commentInstance = {
		//         author: comment.username,
		//         avatar: comment.avatar,
		//         content: comment.content
		//       };
		//       comments.push(commentInstance);
		//     });
		//     this.setState({ 
		//       comments: comments,
		//     });
		//   })
		//   .catch(err => console.log(err));

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
		message.loading({ content: 'Đang tiến hành đặt chỗ...', key });
		const bookingData = this.state.item;
		bookingData.bookingAt = Date().toLocaleString();

		axios.post(`https://enigmatic-everglades-66523.herokuapp.com/api/order/create`, bookingData)
			.then(res => {
				console.log(res.data)
				this.setState({
					item: {
						name: "",
						phoneNumber: "",
						time: "",
						date: "",
						peopleNumber: "",
						placeID: this.state.palaceInfo.id,
						placeName: this.state.palaceInfo.name,
						placeImage: this.state.palaceInfo.image,
						placeAddress: this.state.palaceInfo.address,
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
						message.error({ content: "Thất bại", key, duration: 2 });
					}, 200);
				}
			})
			.catch((err) => {
				console.log(err);
				setTimeout(() => {
					message.error({ content: "Thất bại", key, duration: 2 });
				}, 200);
			});

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
		this.setState({ item: item });
	}

	handleEditPhoneNumber = e => {
		let item = this.state.item
		item.phoneNumber = e.target.value;
		this.setState({ item: item });
	}

	handleEditTime = (time, timeString) => {
		let item = this.state.item
		item.time = timeString;
		this.setState({ item: item });

	}

	handleEditDate = (date, dateString) => {
		let item = this.state.item
		item.date = dateString;
		this.setState({ item: item });
		if (date) {
			console.log(date._d.getTime())
			console.log(new Date().getTime())
		}
	}

	handleEditPeopleNumber = e => {
		let item = this.state.item
		item.peopleNumber = e;
		this.setState({ item: item });
	}

	// state = {
	//   comments: [{
	//     author: 'Han Solo',
	//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
	//     content: <p>1234</p>,
	//     datetime: moment().fromNow(),
	//   },],
	//   submitting: false,
	//   value: '',
	// };

	handleAddCmtSubmit = () => {
		if (!this.state.EdtValue) {
			return;
		}

		if (!this.state.currentUser) {
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
			placeID: this.state.palaceInfo.id,
			avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv4Hviqmchu_hUMBjF-CWJaFVpNVbS05hI5w&usqp=CAU',
			content: value,
			datetime: Date().toLocaleString(),
		};
		// bookingData.bookingAt = Date().toLocaleString();

		axios.post(`https://enigmatic-everglades-66523.herokuapp.com/api/comment/create`, CmtData)
			.then(res => {
				console.log(res.data)
				this.setState({
					submitting: false,
					EdtValue: '',
				});
				// if (res.data.success === 1) {
				//   setTimeout(() => {
				//     message.success({ content: 'Bạn đã đặt thành công!', key, duration: 2 });
				//   }, 200);
				//   this.setState({
				//     visible: false,
				//   });
				// }
				// else {
				//   setTimeout(() => {
				//     message.error({ content: "Thất bại", key, duration: 2 });
				//   }, 200);
				// }
			})
			.catch((err) => {
				console.log(err);
				setTimeout(() => {
					message.error({ content: "Thất bại", key, duration: 2 });
				}, 200);
			});

		// setTimeout(() => {
		//   this.setState({
		//     submitting: false,
		//     value: '',
		//     comments: [
		//       {
		//         author: 'Han Solo',
		//         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		//         content: <p>{this.state.value}</p>,
		//         datetime: moment().fromNow(),
		//       },
		//       ...this.state.comments,
		//     ],
		//   });
		// }, 1000);
	};

	handleChangeCmtTextBox = e => {
		this.setState({
			EdtValue: e.target.value,
		});
	};

	handleDeleteCmt = cmtid => {
		axios.put(`https://enigmatic-everglades-66523.herokuapp.com/api/comment/delete/${cmtid}`, { userID: this.state.currentUser.id })
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
		// console.log(this.state.comments)
		// console.log(new Date().getMinutes())
		const key = 'updatable';
		axios.get(
			`https://enigmatic-everglades-66523.herokuapp.com/api/comment/getAllCommentOfPlace/${this.props.match.params.id}`
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
					comments.push(commentInstance);
				});
				comments.reverse();
				this.setState({
					comments: comments,
				});
			})
			.catch(err => console.log(err));
		var item = this.state.item;
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
							<img alt="place-ava" style={{ width: '100%' }} src={this.state.palaceInfo.image}></img>
						</div>
					</Carousel>
					<div className="ml-auto mr-auto col-md-8" style={{ marginTop: 25 }}>

						<h1 style={{ textAlign: "center" }}>{this.state.palaceInfo.name}</h1>

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
						{this.state.currentUser ? (<>
							<div style={{ margin: 25 }}>
								<h3 style={{ textAlign: "center" }}>Enjoy!</h3>
								<div style={{ textAlign: "center" }}>
									<Button type="primary" shape="round" size="large" onClick={this.showModal}>
										Đặt chỗ
                </Button>
								</div>
								<Modal
									title="Đặt chỗ"
									visible={this.state.visible}
									onFinish={this.openMessage}
									onCancel={this.handleCancel}
									footer={[
										<Button key="return" onClick={this.handleCancel}>
											Quay lại
                  </Button>,
									]}
								>
									{BookForm(
										e => this.handleEditName(e),
										e => this.handleEditPhoneNumber(e),
										(time, timeString) => this.handleEditTime(time, timeString),
										(date, dateString) => this.handleEditDate(date, dateString),
										e => this.handleEditPeopleNumber(e),
										e => this.handleOk(e),
										item
									)}
								</Modal>
							</div>
						</>) : (
								<>
									<div style={{ margin: "7em" }}>
										<h2 style={{ textAlign: "center" }}><Link to="/login">ĐĂNG NHẬP</Link> để đặt chỗ và đăng tải bình luận của bạn !</h2>
									</div>
								</>
							)}
						<h3>Bình luận</h3>
						<CommentAddBox
							comments={this.state.comments}
							submitting={this.state.submitting}
							handleChange={this.handleChangeCmtTextBox}
							handleSubmit={this.handleAddCmtSubmit}
							handleDelete={this.handleDeleteCmt}
							value={this.state.EdtValue}
							currentUser={this.state.currentUser}

						/>

					</div>

					<Footer style={{ textAlign: 'center' }}> ©2020 魔法使い</Footer>
				</Layout>
			</>
		);
	}
}

export default PlaceDetail;
