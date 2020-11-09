import React, { Component } from "react";
import { Form, Input, InputNumber, Button } from "antd";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a validate number!",
  },
};

class FormUpdateInfo extends Component {
  constructor(props) {
    super(props);
    this.userInfo = props.userInfo;
    this.onSubmitUpdate = props.onFinish;
  }

  onFinish = (values) => {
    this.onSubmitUpdate(values);
  };

  render() {
    return (
      <div style={{ padding: '0 200px', marginTop: 60}}>
        <Form
          {...layout}
          name="control-ref"
          initialValues={{
            name: this.userInfo.name,
            age: this.userInfo.age,
            position: this.userInfo.position,
            company: this.userInfo.company,
            technology: this.userInfo.technology,
            hobby: this.userInfo.hobby,
          }}
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Age" name="age" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Company"
            name="company"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Technology"
            name="technology"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Hobby" name="hobby" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default FormUpdateInfo;
// export default Form.create()(FormUpdateInfo);
