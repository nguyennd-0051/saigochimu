import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PlaceList from "../views/place-list/PlaceList";
import PlaceDetail from "../components/placeDetail/PlaceDetail"
import MyPlaces from '../views/ordered-places/MyPlaces'

var orderPlaces = []

const updateOrderPlace = (placeID, name, phone, date, time, participants) => {
    let order = {
        placeID,
        name,
        phone,
        date,
        time,
        participants,
    }
    orderPlaces.push(order)
}

console.log(orderPlaces)

const Routes = () => (
    <Switch>
        <Route path='/place/:id' render={(props) => <PlaceDetail updateOrderPlace = {updateOrderPlace} {...props}/>}/>
        {/* <Route path='/place/:id'>
            <PlaceDetail updateOrderPlace = {updateOrderPlace}/>
        </Route> */}
        <Route path='/myplaces'>
            {/* <MyPlaces places={orderPlaces}/> */}
            <MyPlaces places={orderPlaces} />
        </Route>
        <Route path='/'>
            <PlaceList />
        </Route>
    </Switch>
);

export default Routes;
