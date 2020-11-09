import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PlaceList from "../views/place-list/PlaceList";

const Routes = () => (
    <Switch>
        <Route path='/place/:id'>
            {/*<ProfileEdit />*/}
        </Route>
        <Route path='/'>
            <PlaceList />
        </Route>
    </Switch>
);

export default Routes;
