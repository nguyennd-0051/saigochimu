import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PlaceList from "../views/place-list/PlaceList";
import PlaceDetail from "../components/placeDetail/PlaceDetail"

const Routes = () => (
    <Switch>
        <Route path='/place/:id' component={PlaceDetail}/>
        <Route path='/'>
            <PlaceList />
        </Route>
    </Switch>
);

export default Routes;
