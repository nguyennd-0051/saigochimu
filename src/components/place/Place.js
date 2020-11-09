import React, { Component, Link } from 'react';
import { Card, Tag, PageHeader, Button, Typography, Row, Rate } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import "./Place.css";

const { Paragraph } = Typography;

const Content = ({ children, extraContent }) => {
  return (
    <Row>
      <div style={{ flex: 1 }}>{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );
};

class Place extends Component {

  render() {
    const {
      post,
      ...props
    } = this.props;

    return (
      <PageHeader
      style={{boxShadow: "5px 5px 20px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)", margin: 20, background: "#fff"
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
          <img
              src={post.image}
              alt="content"
              width="100%"
          />
          {/*<Paragraph  ellipsis={{ rows: 3, expandable: true }}>*/}
          {/*{this.props.post.address}*/}
          {/*</Paragraph>*/}
          <h3>{this.props.post.address}</h3>
          <Rate allowHalf defaultValue={0} value={this.props.post.vote} />
        </Content>
      </PageHeader>
    );
  }
}

export default Place;

