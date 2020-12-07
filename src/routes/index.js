import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Signin from "../components/auth/Signin"
import Signup from "../components/auth/Signup"
import Profile from "../components/auth/UserProfile"
import PlaceList from "../views/place-list/PlaceList";
import PlaceDetail from "../components/placeDetail/PlaceDetail"
import MyPlaces from '../views/ordered-places/MyPlaces'

const Routes = () => (
    <Switch>
        <Route path='/place/:id' render={(props) => <PlaceDetail {...props}/>}/>
        <Route path='/myplaces'>
            <MyPlaces />
        </Route>
        <Route path='/home'>
            <PlaceList />
        </Route>
        <Route path='/login'>
            <Signin />
        </Route>
        <Route path='/register'>
            <Signup />
        </Route>
        <Route path='/profile'>
            <Profile />
        </Route>
    </Switch>
);

export default Routes;
