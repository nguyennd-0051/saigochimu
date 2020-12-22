import React from 'react'
import { Menu, Dropdown, Button, Switch, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons';

export default function Restaurant(props) {

  // type
  // present: false,
  // seating: 0, // 0 - All, 1 - date, 2 - family

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

  return (
    <Space style={{ margin: "auto" }}>
      <Switch checkedChildren="Tặng quà" unCheckedChildren="Tặng quà" onClick={props.changeRestaurantPresent} />


      Loại chỗ: <Dropdown overlay={typePresent} trigger={['click']}>
        <Button>{typeSeating} <DownOutlined /> </Button>
      </Dropdown>
    </Space>
  )
}
