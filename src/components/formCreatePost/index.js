import React, { Component } from "react";
// import AddTag from "../addTag";
import { Tag, Input, Tooltip, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const children = [];

class FormCreatePost extends Component{
	constructor(props){
		super(props);
		this.state = {
			isAddTag: false,
      tmptitle: '',
      tmpcontent: '',
      tmpSelectedTag: []
    };
    this.loadData();
  }

  loadData() {
    children.length = 0;
    this.props.tagList.forEach((tag, index) => {
      if(tag!=='All') children.push(<Option key={index} value={tag}>{tag}</Option>);
    });
  }

  handleChange = (value) => {
    this.setState({tmpSelectedTag: value});
  }
  
  handleTitleChange = (e) => {
    this.setState({tmptitle: e.target.value});
  }
 
  handleContentChange = (e) => {
    this.setState({tmpcontent: e.target.value});
  }

  handleSubmit = (e) => {
    const {tmptitle, tmpcontent, tmpSelectedTag} = this.state;
    e.preventDefault();

    let value = {
      title: tmptitle,
      content: tmpcontent,
      selectedTag: tmpSelectedTag
    }
    this.props.createPost(value);
    this.setState({
      isAddTag: false,
      tmpcontent: '',
      tmptitle: '',
      tmpSelectedTag: []
    })
  }  

	render(){
		return (
			<div
        className="FormCreatePost">
				<div
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Create Post
                </h5>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="name">Title:</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="form-control"
                      placeholder="Enter title"
                      aria-describedby="helpId"
                      onChange={this.handleTitleChange}
                      value={this.state.title}
                    />
                    <label htmlFor="name">Content:</label>
                    <textarea
                      type="text"
                      name="content"
                      id="content"
                      className="form-control"
                      placeholder="Enter content"
                      aria-describedby="helpId"
                      onChange={this.handleContentChange}
                      value={this.state.content}
                    />
                  </div>
                  <Select size="large" mode="tags" style={{ width: '100%' }} placeholder="Select Tag" onChange={this.handleChange}>
                    {children}
                  </Select>
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-outline-success"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
			</div>
		);
	}
}

export default FormCreatePost;
