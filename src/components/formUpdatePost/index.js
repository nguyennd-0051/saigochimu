import React, { Component } from "react";
import './FormUpdatePost.css';
import { Tag, Input, Tooltip, Button, Select } from 'antd';

const { Option } = Select;
const children = [];
const defaultTags = [];

class FormUpdatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      title: "",
      // dateCreate: "",
      content: "",
      selectedTag: []
    };
    this.loadData();
  }

  searchIndex = (id) => {
    let result = -1;
    this.props.postLists.forEach((postList, index) => {
      if(postList.id === id) result = index;
    });
    return result;
  }

  componentDidMount() {
    const { postLists } = this.props;
    let index = this.searchIndex(this.props.id);
    if(index !== -1) {
      this.setState({
        id: index + 1,
        title: postLists[index].title,
        // dateCreate: postLists[index].dateCreate,
        content: postLists[index].content,
        selectedTag: defaultTags,
      });
    }
  }

  onCloseFormUpdatePost = (value) => {
    this.props.closeFormUpdatePost(value);
  };

  onHandleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  onHandleSubmit = (event) => {
    event.preventDefault();
    this.props.updatePost(this.state);
    this.props.closeFormUpdatePost(false);
  };

  loadData = () => {
    const { postLists } = this.props;
    children.length = 0;
    defaultTags.length = 0;
    this.props.tagList.forEach((tag, index) => {
      if(tag!=='All') children.push(<Option key={index} value={tag}>{tag}</Option>);
    });

    let index = this.searchIndex(this.props.id);
    if(index !== -1) {
      postLists[index].selectedTag.forEach((tag,index) => {
        defaultTags.push(tag);
      });
    };
  }
  

  handleChange = (value) => {
    this.setState({selectedTag: value});
  }

  render() {
    return (
      <div
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered updatePost" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Form Update Post
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.onCloseFormUpdatePost(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.onHandleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                    placeholder="Enter name"
                    aria-describedby="helpId"
                    onChange={this.onHandleChange}
                    value={this.state.title}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content:</label>
                  <textarea
                    type="text"
                    name="content"
                    id="content"
                    className="form-control"
                    placeholder="Enter name"
                    aria-describedby="helpId"
                    onChange={this.onHandleChange}
                    value={this.state.content}
                  />
                </div>
                <Select
                  size="large" 
                  mode="tags" 
                  style={{ width: '100%' }} 
                  placeholder="Select Tag" 
                  onChange={this.handleChange}
                  defaultValue={defaultTags}
                >
                    {children}
                  </Select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-dismiss="modal"
                  onClick={() => this.onCloseFormUpdatePost(false)}
                >
                  Cannel
                </button>
                <button
                  type="submit"
                  className="btn btn-outline-success"
                  onClick={this.onAddTag}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FormUpdatePost;
