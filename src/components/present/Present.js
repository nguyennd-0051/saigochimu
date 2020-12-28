import React, { Component } from 'react';
import { PageHeader, Row } from 'antd';
import "./Present.css";

const Content = ({ children, extraContent }) => {
    return (
        <Row>
            <div style={{ height: "24em", display: "flex", flexDirection: "Column", justifyContent: "space-between" }}>{children}</div>
            <div className="image">{extraContent}</div>
        </Row>
    );
};

class Present extends Component {

    render() {
        const {
            post,
        } = this.props;

        return (
            <PageHeader
                style={{
                    boxShadow: "5px 5px 20px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)",
                    margin: 20,
                    background: "#fff",
                    height: "420px",
                }}
                title={post.name}
                className="site-page-header post-container"
            // subTitle={post.dateCreate}
            // tags={post.selectedTag ? post.selectedTag.map(tag => (
            //   <Tag
            //     key={tag}
            //     color="blue"
            //   >
            //     {tag}
            //   </Tag>
            // ))
            //     : null
            // }
            >
                <Content>
                    {/* <div
            style={{height: "100%", display: "flex", flexDirection: "Column", justifyContent: "space-between"}}
          > */}
                    <div>
                        <img
                            src={post.image}
                            alt="content"
                            width="80%"
                            height="240px"
                            style={{
                                marginLeft: "2em",
                            }}
                        />
                    </div>
                    {/*<Paragraph  ellipsis={{ rows: 3, expandable: true }}>*/}
                    {/*{this.props.post.address}*/}
                    {/*</Paragraph>*/}
                    <div style={{ margin: "auto" }}>
                        <span style={{ fontSize: "1em", color: "red" }}>đ</span>
                        <span style={{ fontSize: "1.18em", color: "red" }}>{this.props.post.cost}</span>
                    </div>
                    {/* <div>
              <Rate allowHalf disabled defaultValue={0} value={this.props.post.vote} />
            </div> */}

                    {/* </div>     */}
                </Content>
            </PageHeader>
        );
    }
}

export default Present;

