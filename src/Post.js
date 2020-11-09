import React, { Component } from 'react';
import { Card, Tag, PageHeader, Button, Typography, Row } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import "./Post.css";

const { Paragraph } = Typography;

const Content = ({ children, extraContent }) => {
  return (
    <Row>
      <div style={{ flex: 1 }}>{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );
};

class Post extends Component {

  createPost = (value) => {
    this.props.createPost(true, value);
  }
  
  render() {
    const {
      post,
      ...props
    } = this.props;
  
    return (
      <PageHeader
      style={{boxShadow: "5px 5px 20px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)", margin: 20, background: "#fff"
      }}
        title={this.props.post.title}
        className="site-page-header post-container"
        subTitle={this.props.post.dateCreate}
        tags={this.props.post.selectedTag.map(tag => (
          <Tag
            key={tag}
            color="blue"
          >
            {tag}
          </Tag>
        ))}
        extra={[
          <Button key="edit" onClick={() => this.createPost(this.props.post.id)}><EditOutlined /></Button>,
          <Button key="delete" {...props}>
            <DeleteOutlined />
          </Button>,
        ]}
        avatar={{ src: 'https://avatars1.githubusercontent.com/u/60763388?s=460&u=1011ca50a99ede598aef7569fc793ce1e4d6f5ce&v=4' }}
      >
        <Content>
          <Paragraph  ellipsis={{ rows: 3, expandable: true }}>
          {this.props.post.content}
          </Paragraph>
        </Content>
      </PageHeader>
    );
  }
}

export default Post;

