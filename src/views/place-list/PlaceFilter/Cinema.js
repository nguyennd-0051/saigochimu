import React, { useState } from 'react'
import { Space, Radio } from 'antd'

export default function Cinema(props) {
  // Sweetbox: 0, 0 - Kamawanai, 1 - Có

  const radioStyle = {
    display: 'block',
    height: '100%',
    textAlign: 'center',
    borderRadius: '25px'
  };

  return (
    <Space style={{float:"right",marginLeft:"auto"}} >
      <Radio.Group value={props.typeCinema.sweetBox} >
        <Radio.Button style={radioStyle} value={1} onClick={props.changeSweetBox}>Sweetbox</Radio.Button>
      </Radio.Group>
    </Space>
  )
}
