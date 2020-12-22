import React from 'react'
import { Space, Radio } from 'antd'

export default function Cafe(props) {

  const radioStyle = {
    display: 'block',
    height: '100%',
    textAlign: 'center',
    borderRadius: '25px',
  };

  return (
    <Space style={{float:"right",marginLeft:"auto"}} >
      <Radio.Group value={props.typeCoffee.view}>
        <Radio.Button style={radioStyle} value={1} onClick={props.changeCoffeeView}>View</Radio.Button>
      </Radio.Group>

      <Radio.Group value={props.typeCoffee.noSmoking}>
        <Radio.Button style={radioStyle} value={1} onClick={props.changeCoffeeNoSmoking}>No smoking</Radio.Button>
      </Radio.Group>
    </Space>
  )
}
