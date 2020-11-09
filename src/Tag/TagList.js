import React, { Component } from 'react';
import './TagList.css';

class TagListItem extends Component {
  render() {

    return (
      <div  onClick ={this.props.onClick}>
        <div className={this.props.current === this.props.tag ? 'yes' : 'no'} >  {this.props.tag}</div>
      </div>
    );
  }
}


export default TagListItem  ;
