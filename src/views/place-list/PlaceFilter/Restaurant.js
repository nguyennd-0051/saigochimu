import React, { useState } from 'react'
import { Menu, Dropdown, Button, Switch, Space, Radio } from 'antd'
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

  const typeSeating = (
    props.typeRestaurant ? (
      props.typeRestaurant.seating === 0 ? "Tất cả" :
      props.typeRestaurant.seating === 1 ? "Hẹn hò" :
      "Gia đình"
    ) : ""
    
  )

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  return (
    <Space style={{ margin: "auto" }}>
      <Switch checkedChildren="Tặng quà" unCheckedChildren="Tặng quà" onClick={props.changeRestaurantPresent} />


      Loại chỗ: <Dropdown overlay={typePresent} trigger={['click']}>
        <Button>{typeSeating} <DownOutlined /> </Button>
      </Dropdown>

      <Radio.Group value={props.typeRestaurant.kidPlayground}>
        <Radio.Button style={radioStyle} value={1} onClick={props.changeKidPlayground}>Trông trẻ</Radio.Button>
      </Radio.Group>
    </Space>
  )
}
