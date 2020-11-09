import React from "react";
// import AddTag from "./components/addTag";

import Place from "../../components/place/Place";
import TagList from "../../components/tagList/TagList";
import NavBar from "../../components/navbar/NavBar";
import "./PlaceList.css";
import { Layout, Menu, Carousel, Avatar, Row, Col, Tag } from 'antd';
import axios from "axios";


const { CheckableTag } = Tag;
const exampleContent1 =
    `Ant Design interprets the color system into two levels: a system-level color system and a
      product-level color system.
      Ant Designs design team preferred to design with the HSB color model, which makes it
      easier for designers to have a clear psychological expectation of color when adjusting colors,
      as well as facilitate communication in teams.`;
const exampleContent2 =
    `If you’re thinking of starting your very own blog, but just don’t have a clue on what to blog about, then fear not!

In this article, I have included a whole load of blog examples from a wide variety of different niches.

Since the beginning of the internet, millions and millions and millions of blogs have been created. Many have died due to lost interest or their owners giving up on the idea, while others have thrived and continue to grow, making money and earning their owners a steady income. It’s a constant evolution of content that keeps people coming back for more, especially if these blogs contact highly resourceful material that people find useful and interesting.

Each example listed in this blog post are all different in some way and all bring something unique to their readers & subscribers. I want to show you what is possible and how you can take inspiration from them and create an awesome blog of your own.

Some of these blogs make over $100k a month, others are just a hobby for their owners, but all have the same purpose at their core… the love of writing and sharing information.`
const exampleContent3 =
    `One of the more popular frugal blogs in the UK, Miss Thrifty is targeting young mums with her money saving, frugal tips and articles. And rightly so! The market is massive and she’s meeting a need for this type of information. Young mums aren’t exactly rolling in cash. They may have had to give up work and are now relying on just one wage coming in, so the need to be more frugal with everyday living is a must.

The great thing about this blog is the conversational tone and the real person behind the brand. I think it’s inspiring to other mums to see someone like them making such a difference in other people’s lives by creating amazingly useful content that is 100% actionable. Also it may inspire mums to set up their own blog and to write about their experiences as a mother and a wife in the 21st century.`
const exampleContent4 =
    `Medium is not like any other platform on the internet. Our sole purpose is to help you find compelling ideas, knowledge, and perspectives. We don’t serve ads—we serve you, the curious reader who loves to learn new things. Medium is home to thousands of independent voices, and we combine humans and technology to find the best reading for you—and filter out the rest.I love Medium’s new publications: OneZero, GEN, Heated. And, I’m especially excited about Tenderly.
In a web full of pseudo thought-leaders, Medium is the one place that I can reliably come to and be better informed in the easiest way possible of the things that matter to me.
`
const exampleTagList = ["All","React","Blockchain","PHP","BrSE","AI"]
const { Header, Content, Footer } = Layout;
const dateFormat = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
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
            idUpdatePost: -1
        };

        this.handleChangeFilterTag = this.handleChangeFilterTag.bind(this);
    }

    componentDidMount() {
        axios.get(`https://itss-2.herokuapp.com/palace`)
            .then(res => {
                if (res.data) {
                    this.setState({
                        placeList: res.data.allPalace
                    });
                }
                console.log(res.data.allPalace);

            })
            .catch(error => console.log(error));
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
        if (nextSelectedTags.length == 0) {
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

    renderPostList = (filterTagList) => {
        const {placeList} = this.state;
        console.log(placeList, 123);
        // let renderPostList = [];
        // if (filterTagList.length == 1 && filterTagList[0] == "All") {
        //     renderPostList = placeList;
        // } else {
        //     // renderPostList = placeList.filter(post => (post.selectedTag.filter((tag) => filterTagList.includes(tag)).length > 0));
        // }
        let renderPostList = placeList;

        return (placeList ? renderPostList.map((post,index) => (
            <Place
                key={index}
                post={post}
                createPost={(value1, value2) => this.setState({ isUpdatePost: value1, idUpdatePost: value2})}
            />
        ))
        : null
        );
    };

    onClickChangePage = e => {
        this.setState({
            currentPage: e.key,
        });
    };


    render() {
        return (
            <Layout className="layout" style={{background: "#fff"}}>
                {/* <Menu theme="light" onClick={this.onClickChangePage} selectedKeys={[this.state.currentPage]} mode="horizontal" style={{ position: 'fixed', zIndex: 1, width: '100%', height: 50 }}>
          <Menu.Item key="index"><GitlabOutlined />My Blog</Menu.Item>
          <Menu.Item key="create" style={{float: 'right'}}><EditOutlined />Create Post</Menu.Item>
          <Menu.Item key="profile" style={{float: 'right'}}><UserOutlined />My Profile</Menu.Item>
        </Menu> */}
                <NavBar
                    currentPage = {this.state.currentPage}
                    onClickChangePage = {this.onClickChangePage}
                />
                {
                    <>
                        <Carousel style={{ marginTop: 50 }} >
                            <div>
                                <img
                                    style={{width: '100%'}}
                                    src="https://prisoliveras.com/wp-content/uploads/amazing-sunset-beach-high-defination-widescreen-background-wallpaper-image-free.jpg"
                                    style={{verticalAlign: 'top'}}
                                ></img>
                            </div>
                        </Carousel>

                        <div className="ml-auto mr-auto text-center col-md-6">
                            <h1>{this.state.userInfo.name}</h1>
                            <h3 className="text-uppercase">{this.state.userInfo.position}</h3>
                            <h4 className="font-weight-light">{this.state.userInfo.company}</h4>
                            <br/>
                            <h3>Enjoy Reading!</h3>
                            <br />
                            <br />
                        </div>
                    </>
                }

                <Content style={{ padding: '0 200px', marginTop: 0, minHeight: '90vh' }}>
                    <div className="site-layout-content">
                            <>
                                {/*<TagList*/}
                                {/*    tagList = {this.state.tagList}*/}
                                {/*    filterTagList = {this.state.filterTagList}*/}
                                {/*    handleChangeFilterTag = {this.handleChangeFilterTag}*/}
                                {/*/>*/}
                                {this.renderPostList(this.state.filterTagList)}
                            </>
                        }
                    </div>

                </Content>
                <Footer style={{ textAlign: 'center' }}>Group6 ©2020 ITSS</Footer>
            </Layout>
        );
    }
}

export default PlaceList;
