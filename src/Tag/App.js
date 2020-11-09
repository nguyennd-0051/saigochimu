import React, { Component } from 'react';
import TagListItem from "./TagList.js"
import SubmitForm from "./TagForm.js"
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      taglist : [
        {
          tag: "#comedy",
        },
        {
          tag: "#la",
        }
      ],
      current: null
    }
    this.MarkCurrent = this.MarkCurrent.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
  }

  handleAddTag = (item) => {
    this.state.taglist.push(item);
    this.setState({ taglist: this.state.taglist });
  };

  MarkCurrent = index => {
    this.state.current = this.state.taglist[index]
    this.setState({ taglist: this.state.taglist });
    this.setState({ current: this.state.current });
  };
  

  render() {
    let items = this.state.taglist.map((item, index) => {
      let result = ""
      if (item) {
        result = <TagListItem
                  key={index}
                  tag={item.tag}
                  onClick={() => this.MarkCurrent(index)}
                />
      }

      return result
    })
    return (
      <div className="App">
        <div className="App-form">
          <SubmitForm
           onAddTag={this.handleAddTag}

          />
        </div>
        <div>
          {items}
        </div>
      </div>
    );
  }
}

export default App;
