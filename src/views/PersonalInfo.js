import React, { Component } from "react";
import { Form, Button } from "antd";
import FormUpdateInfo from "./FormUpdateInfo";
// import '~antd/dist/antd.css';
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
};

class PersonalInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdateInfo: false,

      userInfo: props.userInfo,
    };
    this.onSubmitUpdate = props.onSubmitUpdate;

    this.formRef = React.createRef();

    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  onClickEdit = () => {
    this.setState({ isUpdateInfo: true }, () => {});
  };

  onClickCancel = () => {
    this.setState({ isUpdateInfo: false }, () => {});
  };

  onFinish = (values) => {
    this.setState(
      {
        userInfo: values,
        isUpdateInfo: false,
      },
      () => this.onSubmitUpdate(values)
    );
  };

  render() {
    return (
      <div>
        {!this.state.isUpdateInfo ? (
          <Form style={{ padding: '0 200px', marginTop: 60}} title="User Information" {...layout}>
            <Form.Item label="Name">{this.state.userInfo.name}</Form.Item>
            <Form.Item label="Age">{this.state.userInfo.age}</Form.Item>
            <Form.Item label="Position">
              {this.state.userInfo.position}
            </Form.Item>
            <Form.Item label="Company">{this.state.userInfo.company}</Form.Item>
            <Form.Item label="Technology">
              {this.state.userInfo.technology}
            </Form.Item>
            <Form.Item label="Hobby">{this.state.userInfo.hobby}</Form.Item>
          </Form>
        ) : (
          <FormUpdateInfo
            userInfo={this.state.userInfo}
            onFinish={this.onFinish}
          />
        )}
        {!this.state.isUpdateInfo ? (
          <Button type="primary" onClick={this.onClickEdit}>
            Edit
          </Button>
        ) : (
          <Button type="default" danger onClick={this.onClickCancel}>
            Cancel
          </Button>
        )}
      </div>
    );
  }
}

export default PersonalInfo;
