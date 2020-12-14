import React  from "react";
// import AddTag from "./components/addTag";

import Place from "../../components/place/Place";
import Present from "../../components/present/Present";
import NavBar from "../../components/navbar/NavBar";
import "./PlaceList.css";
import { Layout, Carousel, Row, Col, Radio, Space, Menu, Dropdown, Button, Tabs, PageHeader } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import orderBy from "lodash/orderBy";
import axios from "axios";
import SearchBar from '../../components/searchBar/searchBar';

import UserService from "../../services/user.service";

const { TabPane } = Tabs;

const exampleTagList = ["All","React","Blockchain","PHP","BrSE","AI"]
const { Content, Footer } = Layout;
// const dateFormat = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
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
            event: "Tất cả",
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
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
                    this.setState({
                        placeList: res.data.allPalace,
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
                console.log(res.data.allCombo)
            })
            .catch(error => console.log(error));
        // }
        
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
                <Col span={6} key={index}>
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


    render() {
        var FilteredData, rawData;
        const lowerCaseQuery = this.state.query.toLowerCase();

        if (this.state.tabPosition === "palace") {
            rawData = this.state.placeList;
        }

        else if (this.state.tabPosition === "combo") {
            rawData = this.state.comboList;
        }
        else if (this.state.tabPosition === "present") {
            rawData = this.state.presentList;
        }

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

        FilteredData = this.state.type === "Tất cả" ? FilteredData : FilteredData.filter(x => String(x["type"]).includes(this.state.type));

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
                {/* <Menu.Item key="fastfood" value="">Đồ ăn nhanh</Menu.Item> */}
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
                    {/* <div className="site-layout-content"> */}
                    <Tabs defaultActiveKey={this.state.tabPosition}  onChange={e => this.changeTabPosition(e)} centered>
                        {/* <div style={{width:"60%", margin: "auto", marginBottom: "2em" }}>
                        </div> */}
                        <TabPane tab="Đặt chỗ" key="palace">
                            <div className="search-bar" style={{width:"60%", margin: "auto", marginBottom: "2em" }}>
                                <SearchBar 
                                    value={this.state.query}
                                    handleSearch={this.handleSearch}
                                >
                                </SearchBar>
                            </div>
                            
                            <div style={{width:"60%", margin: "auto", marginBottom: "2em" }}>
                                <Space style={{ margin: "auto" }}>
                                    {/* <Radio.Group value={this.state.tabPosition} onChange={this.changeTabPosition}>
                                        <Radio.Button value="all">Tất cả</Radio.Button>
                                        <Radio.Button value="under300">300.000đ</Radio.Button>
                                        <Radio.Button value="300to500">500.000đ</Radio.Button>
                                        <Radio.Button value="500to1000">1.000.000đ</Radio.Button>
                                        <Radio.Button value="above1000">1.000.000đ+</Radio.Button>
                                    </Radio.Group> */}
                                
                                    Giá: <Dropdown overlay={priceMenu} trigger={['click']}>
                                        <Button style={{marginRight: "4em" }}>{this.state.priceFilter} <DownOutlined /> </Button>
                                    </Dropdown>

                                    Loại: <Dropdown overlay={typeMenu} trigger={['click']}>
                                    <Button>{this.state.type} <DownOutlined /> </Button>
                                    </Dropdown>

                                    {/* <Radio.Group disabled={true}>
                                        <Radio.Button value="date">2 người</Radio.Button>
                                        <Radio.Button value="family">Gia đình</Radio.Button>
                                    </Radio.Group> */}
                                </Space>
                            </div>
                            <Row>
                                <>
                                    {/*<TagList*/}
                                    {/*    tagList = {this.state.tagList}*/}
                                    {/*    filterTagList = {this.state.filterTagList}*/}
                                    {/*    handleChangeFilterTag = {this.handleChangeFilterTag}*/}
                                    {/*/>*/}
                                    {this.renderPostList(this.state.filterTagList, data)}
                                </>
                            </Row>
                        </TabPane> 
                        <TabPane tab="Combo" key="combo">
                            <Row>
                                <>
                                {/* <span>{rawData[0].startTime}</span> */}
                                    {this.state.tabPosition === "combo" ? this.renderSetList(this.state.filterTagList, rawData) : null}
                                </>
                            </Row>
                        </TabPane>
                        <TabPane tab="Quà tặng" key="present">
                            <div className="search-bar" style={{width:"60%", margin: "auto", marginBottom: "2em" }}>
                                <SearchBar 
                                    value={this.state.query}
                                    handleSearch={this.handleSearch}
                                >
                                </SearchBar>
                            </div>
                            
                            <div style={{width:"60%", margin: "auto", marginBottom: "2em" }}>
                                <Space style={{ margin: "auto" }}>
                                
                                    Giá: <Dropdown overlay={priceMenu} trigger={['click']}>
                                        <Button style={{marginRight: "4em" }}>{this.state.priceFilter} <DownOutlined /> </Button>
                                    </Dropdown>

                                    Sự kiện: <Dropdown overlay={eventMenu} trigger={['click']}>
                                    <Button>{this.state.type} <DownOutlined /> </Button>
                                    </Dropdown>
                                </Space>
                            </div>
                            <Row>
                                <>
                                    {this.renderPresentList(this.state.filterTagList, data)}
                                </>
                            </Row>
                        </TabPane> 
                    {/* </div> */}
                    </Tabs>

                </Content>
                <Footer style={{ textAlign: 'center' }}>Group6 ©2020 ITSS</Footer>
            </Layout>
        );
    }
}

export default PlaceList;
