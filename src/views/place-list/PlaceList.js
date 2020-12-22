import React from "react";
// import AddTag from "./components/addTag";

import Place from "../../components/place/Place";
import Present from "../../components/present/Present";
import NavBar from "../../components/navbar/NavBar";
import "./PlaceList.css";
import { Layout, Carousel, Row, Col, Space, Menu, Dropdown, Button, Tabs, PageHeader } from 'antd';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import orderBy from "lodash/orderBy";
import axios from "axios";
import SearchBar from '../../components/searchBar/searchBar';
import AuthService from "../../services/auth.service";
import Restaurant from './PlaceFilter/Restaurant'
import Cinema from './PlaceFilter/Cinema'



// import UserService from "../../services/user.service";

const { TabPane } = Tabs;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
const key = 'updatable';
const exampleTagList = ["All","React","Blockchain","PHP","BrSE","AI"]
const { Content, Footer } = Layout;
// const dateFormat = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};

const BookForm = (handleEditName, handleEditPhoneNumber, handleEditPeopleNumber, handleOk) => {

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
  
    const validateMessages = {
      // eslint-disable-next-line
      required: 'Hãy điền ${label}!',
      types: {
        // eslint-disable-next-line
        email: '${label} is not a valid email!',
        // eslint-disable-next-line
        number: '${label} is not a valid number!',
      },
      number: {
        // eslint-disable-next-line
        range: '${label} must be between ${min} and ${max}',
      },
    };
  
    return (
      <Form
        {...layout}
        name="basic"
        onFinish={(e)=>handleOk(e)}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="VD: Nga Valin" onChange={(e)=>handleEditName(e)}/>
        </Form.Item>
  
        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[{ required: true }]}
        >
          <Input placeholder="VD: 0910000ko" onChange={(e)=>handleEditPhoneNumber(e)}/>
        </Form.Item>
  
        
  
        <Form.Item
          label="Số người"
          name="peopleNumber"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} max={10} onChange={(e)=>handleEditPeopleNumber(e)}/>
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button shape='round' htmlType="submit" type="primary">
            Đặt ngay
          </Button>
        </Form.Item>
      </Form>
    );
  };

class PlaceList extends React.Component {
    constructor() {
        super();
        this.state = {
            userInfo: {
                name: "Duy Nguyen",
                age: 18,
                position: "BrSE",
                company: "Google Inc.",
                technology: "Python, NodeJS, ReactJS",
                hobby: "Reading Books, Travel"
            },
            item: {
                name: "",
                phoneNumber: "",
                peopleNumber: "",
                comboID: "",
                userID: "",
                username: "",
                userEmail: "",
                bookingAt: "",
                status: "processing",
            },
            tagList: exampleTagList, //initial value must have tag "All"
            filterTagList: ["All"],
            isAddTag: false,
            isUpdatePost: false,
            isCreatePost: true,
            currentPage: 'index',
            placeList: [],
            presentList: [],
            comboList: [],
            idUpdatePost: -1,
            query: "",
            tabPosition: "palace",
            priceFilter: "Tất cả",
            type: "Tất cả",
            typeRestaurant: {
                present: 0,
                kidPlayground: 0, // 0 - Kamawanai, 1 - Có
                seating: 0, // 0 - All, 1 - date, 2 - family
            },
            typeCinema:{
                sweetBox: 0, // 0 - Kamawanai, 1 - Có
            },
            event: "Tất cả",
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            currentUser: undefined,
            visible: false,
        };

        this.handleChangeFilterTag = this.handleChangeFilterTag.bind(this);
    }

    componentDidMount() {
        // if (this.state.tabPosition === "present") {
            axios.get(`https://enigmatic-everglades-66523.herokuapp.com/present`)
            .then(res => {
                if (res.data) {
                    this.setState({
                        presentList: res.data.allPresent,
                    });
                }
            })
            .catch(error => console.log(error));
        // } 
        // else if (this.state.tabPosition === "palace") {
            axios.get(`https://enigmatic-everglades-66523.herokuapp.com/palace`)
            .then(res => {
                if (res.data) {
                    let places = res.data.allPalace
                    places.map(place => {
                        // Set nha hang
                        if (place.type === "Nhà hàng") {
                            let typeRestaurant = {
                                present: false,
                                kidPlayground: false,
                                seating: [],
                            }
                            if (place.id % 3 === 1) typeRestaurant.present = 1 
                            if (place.id % 4 === 1) typeRestaurant.kidPlayground = 1 
                            if (place.id % 5 !== 2) typeRestaurant.seating.push(1)
                            if (place.id % 8 !== 3) typeRestaurant.seating.push(2)
                            place.typeRestaurant = typeRestaurant
                            return place
                        }
                        
                        // set Rap chieu phim
                        if (place.type === "Rạp chiếu phim") {
                            let typeCinema = {
                                sweetBox: false,
                            }
                            if (place.id % 7 === 5 || place.id % 7 === 2 ||place.id % 7 === 3) typeCinema.sweetBox = 1 
                            place.typeCinema = typeCinema
                            return place
                        }                     

                        // set Quan ca phe
                        if (place.type === "Quán cà phê") {
                            // IMPLEMENT!!!
                        }

                        return place
                    })
                    // console.log(places)
                    this.setState({
                        // placeList: res.data.allPalace,
                        placeList: places,
                    });
                }
                
            })
            .catch(error => console.log(error));
        // }
        // else if (this.state.tabPosition === "combo") {
            axios.get(`https://enigmatic-everglades-66523.herokuapp.com/combo`)
            .then(res => {
                if (res.data) {
                    this.setState({
                        comboList: res.data.allCombo,
                    });
                }
                // console.log(res.data.allCombo)
            })
            .catch(error => console.log(error));
        // }
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
        window.addEventListener('resize', this.updateScreenSize);
    }

    updateScreenSize = () => {
        this.setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight })
    }

    handleChangeFilterTag(tag, checked) {
        const { filterTagList } = this.state;
        let nextSelectedTags = [];
        if (checked && tag === "All") {
            nextSelectedTags = ["All"];
        }
        else if (checked && tag !== "All") {
            let temp = filterTagList.filter(t => t !== "All");
            nextSelectedTags = [...temp, tag];
        }
        else {
            nextSelectedTags = filterTagList.filter(t => t !== tag);
        }
        if (nextSelectedTags.length === 0) {
            nextSelectedTags = ["All"];
        }
        this.setState({ filterTagList: nextSelectedTags });
    }

    searchIndex = (id) => {
        let result = -1;
        this.state.placeList.forEach((postList, index) => {
            if (postList.id === id) result = index;
        });
        return result;
    };

    findMaxIndex = () => {
        const { placeList } = this.state;
        let idArray = placeList.map(post => post.id);

        return Math.max(...idArray);
    };

    renderPlaceNotFound = () => {
        return(<Col span={24} key={1}><h2>Không tìm thấy cửa hàng</h2></Col>);
    }

    

    renderPostList = (filterTagList, data) => {
        // let renderPostList = [];
        // if (filterTagList.length == 1 && filterTagList[0] == "All") {
        //     renderPostList = placeList;
        // } else {
        //     // renderPostList = placeList.filter(post => (post.selectedTag.filter((tag) => filterTagList.includes(tag)).length > 0));
        // }
        let renderPostList = data;

        return (data ? renderPostList.map((post,index) => (
            // <Link to={`/place/${post.id}`}>
                <Col span={8} key={index}>
                    <a href={"http://localhost:3000/place/"+post.id}>
                        <Place
                        key={index}
                        post={post}
                        createPost={(value1, value2) => this.setState({ isUpdatePost: value1, idUpdatePost: value2})}
                    />
                    </a>
                </Col>
            // </Link>
        ))
        : (<Col><h2>Không tìm thấy cửa hàng</h2></Col>)
        );
    };

    renderPresentList = (filterTagList, data) => {
        let renderPostList = data;

        return (data ? renderPostList.map((post,index) => (
                <Col span={8} key={index}>
                    <a href={"http://localhost:3000/present/"+post.id}>
                        <Present
                        key={index}
                        post={post}
                        createPost={(value1, value2) => this.setState({ isUpdatePost: value1, idUpdatePost: value2})}
                    />
                    </a>
                </Col>
        ))
        : (<Col><h2>Không tìm thấy cửa hàng</h2></Col>)
        );
    };

    renderSetList = (filterTagList, data) => {
        let renderSetList = data;

        return (data ? renderSetList.map((set ,index) => (
            <PageHeader
                key={index}
                style={{
                    boxShadow: "5px 5px 20px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)",
                    margin: 20,
                    background: "#fff",
                }}
                title={`${set.startTime} - ${set.endTime}`}
                // title={set.startTime}
            >
              {this.state.currentUser ? (<>
                    <div style={{ margin: 25 }}>
                    <h3 style={{ textAlign: "center" }}> </h3>
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
                        <Button shape="round" key="return" onClick={this.handleCancel }>
                            Quay lại
                        </Button>,
                        ]}
                    >
                        {BookForm(
                        e => this.handleEditName(e),
                        e => this.handleEditPhoneNumber(e),
                        e => this.handleEditPeopleNumber(e),
                        e => this.handleOk(e,set.id)
                        )}
                    </Modal>
                    </div>
                </>) : null}
                <Row>
                    <Col span={12}>
                        {/*<a href={"http://localhost:3000/place/"+set[0].id}>*/}
                        <Place
                            // key={index}
                            post={set["places"][0]}
                            createPost={(value1, value2) => this.setState({ isUpdatePost: value1, idUpdatePost: value2})}
                        />
                        {/*</a>*/}
                    </Col>
                    <Col span={12}>
                        {/*<a href={"http://localhost:3000/place/"+set[1].id}>*/}
                        <Place
                            // key={index}
                            post={set["places"][1]}
                            createPost={(value1, value2) => this.setState({ isUpdatePost: value1, idUpdatePost: value2})}
                        />
                        {/*</a>*/}
                    </Col>
                </Row>
            </PageHeader>
                ))
                : (<Col><h2>Không tìm thấy cửa hàng</h2></Col>)
        );
    };

    onClickChangePage = e => {
        this.setState({
            currentPage: e.key,
        });
    };

    handleSearch = value => {
        this.setState({
            query: value,
        });
    }

    changeTabPosition = e => {
        this.setState({
            tabPosition: e,
            priceFilter: "Tất cả",
            type: "Tất cả"
        });
        console.log(this.state.tabPosition);
    };

    changePriceDropDown = e => {
        // console.log(e.key)
        this.setState({ priceFilter: e.key });
    };

    changeType = e => {
        this.setState({ type: e.key });
    };

    changeEvent = e => {
        this.setState({ type: e.key });
    };

    // Support function for restaurant omni-filter
    changeRestaurantPresent = () => {
        let newTypeRestaurant = this.state.typeRestaurant
        newTypeRestaurant.present = 1 - this.state.typeRestaurant.present
        this.setState({
            typeRestaurant: newTypeRestaurant
        }) 
    }

    changeRestaurantSeating = (e) => {
        let newTypeRestaurant = this.state.typeRestaurant
        newTypeRestaurant.seating = parseInt(e.key, 10)
        this.setState({
            typeRestaurant: newTypeRestaurant
        })
    }

    changeKidPlayground = (e) => {
        let newTypeRestaurant = this.state.typeRestaurant
        newTypeRestaurant.kidPlayground = 1 - this.state.typeRestaurant.kidPlayground
        this.setState({
            typeRestaurant: newTypeRestaurant
        })
    }

    changeSweetBox = (e) => {
        let newTypeCinema = this.state.typeCinema
        newTypeCinema.sweetBox = 1 - this.state.typeCinema.sweetBox
        this.setState({
            typeCinema: newTypeCinema
        })
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };

    handleEditName = e => {
        let item = this.state.item
        item.name = e.target.value;
        this.setState({item: item});
      }
    
    handleEditPhoneNumber = e => {
        let item = this.state.item
        item.phoneNumber = e.target.value;
        this.setState({item: item});
      }
      
    handleEditPeopleNumber = e => {
        let item = this.state.item
        item.peopleNumber = e;
        this.setState({item: item});
      }
    
    handleOk = (e, comboID) => {
        // e.preventDefault();
        message.loading({ content: 'Đang tiến hành đặt chỗ...', key });
        const bookingData = this.state.item;
        bookingData.bookingAt = Date().toLocaleString();
        bookingData.comboID = comboID;
        console.log(comboID)
        axios.post(`https://enigmatic-everglades-66523.herokuapp.com/api/comboOrder/create`, bookingData)
          .then(res => {
            console.log(res.data)
            this.setState({ 
              item: {
                name: "",
                phoneNumber: "",
                peopleNumber: "",
                comboID: "",
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
                message.error({ content: "Thất bại!", key, duration: 2 });
              }, 200);
            }
          })
          .catch((err) => {
            console.log(err);
            setTimeout(() => {
              message.error({ content: "Thất bại!", key, duration: 2 });
            }, 200);
          });
    
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

      openMessage = () => {
        message.loading({ content: 'Loading...', key });
        setTimeout(() => {
          message.success({ content: 'Loaded!', key, duration: 2 });
        }, 1000);
      };


    render() {
        console.log(this.state.typeRestaurant)
        var FilteredData, rawData;
        const lowerCaseQuery = this.state.query.toLowerCase();

        // Filter theo tab
        if (this.state.tabPosition === "palace") {
            rawData = this.state.placeList;
        }

        else if (this.state.tabPosition === "combo") {
            rawData = this.state.comboList;
        }
        else if (this.state.tabPosition === "present") {
            rawData = this.state.presentList;
        }

        // Filter theo giá
        if (this.state.priceFilter === "Tất cả") {
            FilteredData = rawData;
        }
        else if (this.state.priceFilter === "0 - 100.000đ") {
            FilteredData = rawData.filter(x => x["cost"] < 100000);
        } 
        else if (this.state.priceFilter === "100.000đ - 300.000đ") {
            FilteredData = rawData.filter(x => x["cost"] < 300000 & x["cost"] >= 100000);
        }
        else if (this.state.priceFilter === "300.000đ - 500.000đ") {
            FilteredData = rawData.filter(x => x["cost"] < 500000 & x["cost"] >= 300000 );
        }
        else if (this.state.priceFilter === "500.000đ - 1.000.000đ") {
            FilteredData = rawData.filter(x => x["cost"] < 1000000 & x["cost"] >= 500000 );
        }
        else if (this.state.priceFilter === "1.000.000đ+") {
            FilteredData = rawData.filter(x => x["cost"] >= 1000000 );
        }

        // Filter theo loại
        FilteredData = this.state.type === "Tất cả" ? FilteredData : FilteredData.filter(x => String(x["type"]).includes(this.state.type));

        // Omni filter cho nhà hàng
        if (this.state.type === "Nhà hàng") {
            if (this.state.typeRestaurant.present !== 0) {
                FilteredData = FilteredData.filter(place => {
                    return place.typeRestaurant.present === 1
                })
            } 
            
            if (this.state.typeRestaurant.kidPlayground !== 0) {
                FilteredData = FilteredData.filter(place => {
                    return place.typeRestaurant.kidPlayground === 1
                })
            }
            
            if (this.state.typeRestaurant.seating !== 0) {
                FilteredData = FilteredData.filter(place => {
                    return place.typeRestaurant.seating.includes(this.state.typeRestaurant.seating)
                })
            }
        }

        // Omni filter cho rap chieu phim
        if (this.state.type === "Rạp chiếu phim") { 
            // IMPLEMENT
            if (this.state.typeCinema.sweetBox !== 0) {
                FilteredData = FilteredData.filter(place => {
                    return place.typeCinema.sweetBox === 1
                })
            }
        }

        // Omni filter cho Quan ca phe 
        if (this.state.type === "Quán cà phê") { 
            // IMPLEMENT
        }

        let data = orderBy(this.state.query? FilteredData.filter(x => String(x["name"]).toLowerCase().includes(lowerCaseQuery)): FilteredData);

        const priceMenu = (
            <Menu key={this.state.priceFilter} onClick={this.changePriceDropDown}>
                <Menu.Item key="Tất cả" value="">Tất cả</Menu.Item>
                <Menu.Item key="0 - 100.000đ" value="">0 - 100.000đ</Menu.Item>
                <Menu.Item key="100.000đ - 300.000đ" value="">100.000đ - 300.000đ</Menu.Item>
                <Menu.Item key="300.000đ - 500.000đ" value="">300.000đ - 500.000đ</Menu.Item>
                <Menu.Item key="500.000đ - 1.000.000đ" value="">500.000đ - 1.000.000đ</Menu.Item>
                <Menu.Item key="1.000.000đ+" value="">1.000.000đ+</Menu.Item>
            </Menu>
        )

        const typeMenu = (
            <Menu key={this.state.type} onClick={this.changeType}>
                <Menu.Item key="Tất cả" value="">Tất cả</Menu.Item>
                <Menu.Item key="Nhà hàng" value="">Nhà hàng</Menu.Item>
                <Menu.Item key="Rạp chiếu phim" value="">Rạp chiếu phim</Menu.Item>
                <Menu.Item key="Quán cà phê" value="">Quán cà phê</Menu.Item>
            </Menu>
        )

        const eventMenu = (
            <Menu key={this.state.type} onClick={this.changeEvent}>
                <Menu.Item key="Tất cả" value="">Tất cả</Menu.Item>
                <Menu.Item key="Sinh nhật" value="">Sinh nhật</Menu.Item>
                <Menu.Item key="Giáng sinh" value="">Giáng sinh</Menu.Item>
                <Menu.Item key="Ngày phụ nữ" value="">Ngày phụ nữ</Menu.Item>
            </Menu>
        )

        return (
            <Layout className="layout" style={{background: "#fff"}}>
                <NavBar
                    currentPage = {this.state.currentPage}
                    onClickChangePage = {this.onClickChangePage}
                    value={this.state.query}
                    handleSearch={this.handleSearch}
                />
                {
                    <>
                        <Carousel style={{ marginTop: 50 }} autoplay="true">
                            <div>
                                <h1 style={{
                                textAlign: 'center',
                                height: `${window.innerHeight*0.55-50}px`,
                                color: '#fff',
                                lineHeight: `${window.innerHeight*0.55-50}px`,
                                background: '#364d79',
                                }}>Welcome to iDate</h1>
                            </div>
                            <div>
                                <img
                                    alt="Landing 1"
                                    src="https://cdn.smassets.net/assets/cms/cc/uploads/holding-hands.jpg"
                                    style={{verticalAlign: 'middle', width: '100%'}}
                                ></img>
                            </div>
                        </Carousel>

                    </>
                }
                <br/>
                <br/>
                <br/>
                <Content style={{ width: "100%", padding: '0 200px', margin: "auto", minHeight: '90vh' }}>
                    <Tabs defaultActiveKey={this.state.tabPosition} style={{fontSize:"1.3em",}} size="large"  onChange={e => this.changeTabPosition(e)} centered>
                        <TabPane tab="Đặt chỗ" key="palace">
                            <div className="search-bar" style={{width:"80%", margin: "auto", marginBottom: "2em" }}>
                                <SearchBar 
                                    value={this.state.query}
                                    handleSearch={this.handleSearch}
                                >
                                </SearchBar>
                            </div>
                            
                            <div style={{width:"80%", margin: "auto", marginBottom: "2em" }}>
                                <div style={{ margin: "auto", width:"100%"}}>                                
                                    Giá: <Dropdown overlay={priceMenu} trigger={['click']}>
                                        <Button shape="round" style={{marginRight: "0.5em" }}>{this.state.priceFilter} <DownOutlined /> </Button>
                                    </Dropdown>
                                    Loại: <Dropdown overlay={typeMenu} trigger={['click']}>
                                    <Button shape="round">{this.state.type} <DownOutlined /> </Button>
                                    </Dropdown>
                                    {this.state.type === "Nhà hàng" ? 
                                        <Restaurant  
                                            typeRestaurant={this.state.typeRestaurant} 
                                            changeRestaurantPresent={this.changeRestaurantPresent}
                                            changeRestaurantSeating={this.changeRestaurantSeating}
                                            changeKidPlayground={this.changeKidPlayground}/> 
                                    : null} 
                                    {this.state.type === "Rạp chiếu phim" ? 
                                        <Cinema  
                                            typeCinema={this.state.typeCinema} 
                                            changeSweetBox={this.changeSweetBox}/> 
                                    : null} 
                                </div>
                            </div>
                            <Row>
                                <>
                                    {this.renderPostList(this.state.filterTagList, data)}
                                </>
                            </Row>
                        </TabPane> 
                        <TabPane tab="Combo" key="combo">
                            <Row>
                                <>
                                    {this.state.tabPosition === "combo" ? this.renderSetList(this.state.filterTagList, rawData) : null}
                                </>
                            </Row>
                        </TabPane>
                        <TabPane tab="Quà tặng" key="present">
                            <div className="search-bar" style={{width:"80%", margin: "auto", marginBottom: "2em" }}>
                                <SearchBar 
                                    value={this.state.query}
                                    handleSearch={this.handleSearch}
                                >
                                </SearchBar>
                            </div>
                            <div style={{width:"80%", margin: "auto", marginBottom: "2em" }}>
                                <Space style={{ margin: "auto" }}>
                                
                                    Giá: <Dropdown overlay={priceMenu} trigger={['click']}>
                                        <Button shape="round" style={{marginRight: "0.5em" }}>{this.state.priceFilter} <DownOutlined /> </Button>
                                    </Dropdown>

                                    Sự kiện: <Dropdown overlay={eventMenu} trigger={['click']}>
                                    <Button shape="round">{this.state.type} <DownOutlined /> </Button>
                                    </Dropdown>
                                </Space>
                            </div>
                            <Row>
                                <>
                                    {this.renderPresentList(this.state.filterTagList, data)}
                                </>
                            </Row>
                        </TabPane> 
                    </Tabs>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Group6 ©2020 ITSS</Footer>
            </Layout>
        );
    }
}

export default PlaceList;
