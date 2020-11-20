import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PlaceList from "../views/place-list/PlaceList";
import PlaceDetail from "../components/placeDetail/PlaceDetail"
import MyPlaces from '../views/ordered-places/MyPlaces'

const Routes = () => (
    <Switch>
        <Route path='/place/:id' render={(props) => <PlaceDetail {...props}/>}/>
        <Route path='/myplaces'>
            <MyPlaces />
        </Route>
        <Route path='/'>
            <PlaceList />
        </Route>
    </Switch>
);

export default Routes;
