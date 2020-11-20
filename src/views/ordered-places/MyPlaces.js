import React, { Component, useState } from 'react'
import Navbar from '../../components/navbar/NavBar'
import * as axios from 'axios';
import { Table } from 'antd'

export default class MyPlaces extends Component {
  state = {
    places: []
  }
  
  componentDidMount() {
    axios.get('https://enigmatic-everglades-66523.herokuapp.com/bookingInfo')
      .then(res => {
        console.log(res.data.allBooking)
        this.setState({ places: res.data.allBooking })
      })
      .catch(error => console.log(error));
  }

  render() {
    var columns = [
      {
        title: "Image",
        dataIndex: 'image',
        key: 'image',
      },
      {
        title: "Customer",
        dataIndex: 'customer',
        key: 'customer,'
      },
      {
        title: 'Information',
        dataIndex: 'information',
        key: 'information',
      },
      {
        title: 'Gift service\n(Coming soon)',
        dataIndex: 'gift',
        key: 'gift,'
      }
    ]
    var dataSource =[]
    if (this.state.places !== null) this.state.places.map((place, index) => {
      let customerInfo = 
      `Customer name: ${place.username}${"\n"}Phone number: ${place.userPhoneNumber}${"\n"}Participants: ${place.peopleNumber}`
      let information = `Place name: ${place.placeName}${"\n"}Address: ${place.placeAddress}${"\n"}Date: ${place.date} 「${place.time}」`
      return dataSource.push({
        key: index,
        customer: customerInfo,
        information: information,
        gift: 'No',
      })
    })

    return (
      <div>
        <Navbar/>
        <div style={{paddingTop: '50px'}}>
          <Table style={{ whiteSpace: 'pre' }} dataSource={dataSource} columns={columns} />
        </div>
      </div>
    )
  }
}
