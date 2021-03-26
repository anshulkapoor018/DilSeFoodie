import React from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Navbar from "./components/navbar.component"
import AuthCredentials from "./components/create-user.component";
import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";
import RestaurantsAll from "./components/restaurant-all.component";
import RestaurantsPage from "./components/restaurant-single.component";
import RestaurantSearch from './components/restaurant-search.component';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import './App.css';

export function onEnter(nextState, transition, callback) {
  const { pathname } = nextState.location
  const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true'
  if (pathname === '/user' && isLoggedIn) {
    window.location = "/profile" //redirect to Home component
  }
  return callback() // go as it is.
}


function App() {
  return (
    <Router>
        <Navbar/>
        <NotificationContainer/>
          <Route exact path="/Home" component={Home} />
          <Route path="/user" component={AuthCredentials} />
          <Route path="/restaurants" component={RestaurantsAll} />
          <Route path="/res/:id" component={RestaurantsPage} />
          <Route path="/search" component={RestaurantSearch} />
          <Route exact path="/profile" component={Profile} onEnter={onEnter} />
          <Route exact path="/">
              <Redirect to="/Home"/>
          </Route>
    </Router>
  );
}

export default App;