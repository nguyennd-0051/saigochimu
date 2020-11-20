import React  from "react";
// import AddTag from "./components/addTag";

import Place from "../../components/place/Place";
import NavBar from "../../components/navbar/NavBar";
import SearchBar from "../../components/searchBar/searchBar";
import "./PlaceList.css";
import { Layout, Carousel, Row, Col, Radio, Space } from 'antd';
import orderBy from "lodash/orderBy";
import axios from "axios";


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
            idUpdatePost: -1,
            query: "",
            tabPosition: "all",
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
        };

        this.handleChangeFilterTag = this.handleChangeFilterTag.bind(this);
    }

    componentDidMount() {
        axios.get(`https://enigmatic-everglades-66523.herokuapp.com/palace`)
            .then(res => {
                if (res.data) {
                    this.setState({
                        placeList: res.data.allPalace,
                    });
                }
            })
            .catch(error => console.log(error));
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
        this.setState({ tabPosition: e.target.value });
    };


    render() {
        var FilteredData
        const lowerCaseQuery = this.state.query.toLowerCase();

        if (this.state.tabPosition === "all") {
            FilteredData = this.state.placeList;
        } 
        else if (this.state.tabPosition === "under300") {
            FilteredData = this.state.placeList.filter(x => x["cost"] < 300000);
        }
        else if (this.state.tabPosition === "300to500") {
            FilteredData = this.state.placeList.filter(x => x["cost"] < 500000 & x["cost"] >= 300000 );
        }
        else if (this.state.tabPosition === "500to1000") {
            FilteredData = this.state.placeList.filter(x => x["cost"] < 1000000 & x["cost"] >= 500000 );
        }
        else if (this.state.tabPosition === "above1000") {
            FilteredData = this.state.placeList.filter(x => x["cost"] >= 1000000 );
        }

        let data = orderBy(this.state.query? FilteredData.filter(x => String(x["name"]).toLowerCase().includes(lowerCaseQuery)): FilteredData);

        return (
            <Layout className="layout" style={{background: "#fff"}}>
                <NavBar
                    currentPage = {this.state.currentPage}
                    onClickChangePage = {this.onClickChangePage}
                />
                {
                    <>
                        <Carousel style={{ marginTop: 50 }} >
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
                                    alt="Landing"
                                    src="https://scontent.fhph1-2.fna.fbcdn.net/v/t1.0-9/124721735_3137057236399601_176059145388527394_o.jpg?_nc_cat=109&ccb=2&_nc_sid=730e14&_nc_ohc=Cf0GAbEIQMwAX9QMlBg&_nc_ht=scontent.fhph1-2.fna&oh=120dcb8d733227e7e4a201ea0ec9b746&oe=5FD0B084"
                                    style={{verticalAlign: 'middle', width: '100%'}}
                                ></img>
                            </div>
                        </Carousel>

                    </>
                }

                <Content style={{ padding: '0 200px', marginTop: 0, minHeight: '90vh' }}>
                    <div className="site-layout-content">
                        <div className="search-bar" style={{width:"60%", margin: "auto", marginBottom: "2em" }}>
                            <SearchBar 
                                value={this.state.query}
                                handleSearch={this.handleSearch}
                            >
                            </SearchBar>
                        </div>
                        
                        <div style={{width:"60%", margin: "auto", marginBottom: "2em" }}>
                            <Space style={{ margin: "auto" }}>
                                <Radio.Group value={this.state.tabPosition} onChange={this.changeTabPosition}>
                                    <Radio.Button value="all">Tất cả</Radio.Button>
                                    <Radio.Button value="under300">300.000đ</Radio.Button>
                                    <Radio.Button value="300to500">500.000đ</Radio.Button>
                                    <Radio.Button value="500to1000">1.000.000đ</Radio.Button>
                                    <Radio.Button value="above1000">1.000.000đ+</Radio.Button>
                                </Radio.Group>

                                <Radio.Group disabled={true}>
                                    <Radio.Button value="date">2 người</Radio.Button>
                                    <Radio.Button value="family">Gia đình</Radio.Button>
                                </Radio.Group>
                            </Space>
                        </div>

                        {/* <div style={{width:"60%", margin: "auto", marginBottom: "2em" }}>
                            
                        </div> */}
                        
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
                    </div>

                </Content>
                <Footer style={{ textAlign: 'center' }}>Group6 ©2020 ITSS</Footer>
            </Layout>
        );
    }
}

export default PlaceList;
