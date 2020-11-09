//file test app.js cua Bao Hieu
import React, { Component } from "react";
import "./App.css";
import PersonalInfo from "./views/PersonalInfo";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        id: "ID",
        name: "Name",
        age: 20,
        position: "Position",
        company: "Company",
        technology: "Technology",
        hobby: "Hobby",
      },
    };

    this.onUpdatePersonalInfo = this.onUpdatePersonalInfo.bind(this);
  }

  onUpdatePersonalInfo(newInfo) {
    this.setState({ userInfo: newInfo });
  }

  render() {
    return (
      <div>
        <PersonalInfo
          userInfo={this.state.userInfo}
          onSubmitUpdate={(values) => this.onUpdatePersonalInfo(values)}
        />
      </div>
    );
  }
}

export default App;
