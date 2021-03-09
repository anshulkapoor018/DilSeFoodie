import React from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Footer from "./Static/Footer"
import Navbar from "./components/navbar.component"
import AuthCredentials from "./components/create-user.component";
import Home from "./views/Home/Home";
// import Header from "./views/Header/Header";
import Profile from "./views/Profile/Profile";
import Restaurants from "./components/restaurant-all.component";
import RestaurantsPage from "./components/restaurant-single.component";

import './App.css'
// import NotFound from "./views/NotFound";

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
        <Navbar></Navbar>
        <Route exact path="/Home" component={Home} />
        <Route path="/user" component={AuthCredentials} />
        <Route path="/restaurants" component={Restaurants} />
        <Route path='/restaurant/:id' component={RestaurantsPage} />
        <Route exact path="/profile" component={Profile} onEnter={onEnter} />
        <Route exact path="/">
            <Redirect to="/Home"/>
        </Route>
    </Router>
  );
}

export default App;
