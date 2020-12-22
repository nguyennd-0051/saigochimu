import React from 'react'
import { Space, Radio } from 'antd'
// import { DownOutlined } from '@ant-design/icons';

export default function Cafe(props) {

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  return (
    <Space style={{ margin: "auto" }}>
      <Radio.Group value={props.typeCoffee.view}>
        <Radio.Button style={radioStyle} value={1} onClick={props.changeCoffeeView}>View</Radio.Button>
      </Radio.Group>

      <Radio.Group value={props.typeCoffee.noSmoking}>
        <Radio.Button style={radioStyle} value={1} onClick={props.changeCoffeeNoSmoking}>No smoking</Radio.Button>
      </Radio.Group>
    </Space>
  )
}
