import React, { useState } from 'react'
import { Menu, Dropdown, Button, Space, Radio } from 'antd'
import { DownOutlined } from '@ant-design/icons';

export default function Restaurant(props) {
  // type
  // present: false,
  // seating: 0, 0 - All, 1 - date, 2 - family
  // kidPlayground: 0, 0 - Kamawanai, 1 - Có

  const typePresent = (
    <Menu key={props.typeRestaurant.seating} onClick={props.changeRestaurantSeating}>
      <Menu.Item key="0" value="">Tất cả</Menu.Item>
      <Menu.Item key="1" value="">Hẹn hò</Menu.Item>
      <Menu.Item key="2" value="">Gia đình</Menu.Item>
    </Menu>
  )

  const options1 = [
    { label: 'Trông trẻ'},
  ];

  const options2 = [
    { label: 'Tặng quà'},
  ];

  const typeSeating = (
    props.typeRestaurant ? (
      props.typeRestaurant.seating === 0 ? "Tất cả" :
      props.typeRestaurant.seating === 1 ? "Hẹn hò" :
      "Gia đình"
    ) : ""
    
  )

  const radioStyle = {
    display: 'block',
    height: '100%',
    textAlign: 'center',
    borderRadius: '25px',
  };

  return (
    <Space style={{float:"right",marginLeft:"auto"}} >
      Loại chỗ: <Dropdown overlay={typePresent} trigger={['click']}>
        <Button shape="round">{typeSeating} <DownOutlined /> </Button>
      </Dropdown>

      {/* <Switch style={{height:"100%"}} checkedChildren="Tặng quà" unCheckedChildren="Tặng quà" onClick={props.changeRestaurantPresent} /> */}

      <Radio.Group value={props.typeRestaurant.kidPlayground} >
        <Radio.Button style={radioStyle} value={1} onClick={props.changeKidPlayground}>Trông trẻ</Radio.Button>
      </Radio.Group>

      <Radio.Group value={props.typeRestaurant.present} >
        <Radio.Button style={radioStyle} value={1} onClick={props.changeRestaurantPresent}>Tặng quà</Radio.Button>
      </Radio.Group>
    </Space>
  )
}
