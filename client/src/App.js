import React, {useState} from 'react';
import styled,{ThemeProvider} from "styled-components";
import {lightTheme, darkTheme, GlobalStyles} from "./themes.js";
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Navbar from "./components/navbar.component"
import AuthCredentials from "./components/create-user.component";
import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";
import RestaurantsAll from "./components/restaurant-all.component";
import RestaurantsPage from "./components/restaurant-single.component";
import RestaurantSearch from './components/restaurant-search.component';
import Accessibility from "./views/Accessibility/accessibility";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import './App.css';
import CartContext from './cart/context';
import useCart from './hooks/use-cart';

import Layout from './layout';
import ProductsPage from './pages/products';
import CartPage from './pages/cart';
import CheckoutPage from './pages/checkout';

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
  background-image:  url('${props => props.theme.background}');
  background-size:100%;
  background-attachment:fixed;
  min-height:1080px;
  `;
//Not sure of this implementation

// export function onEnter(nextState, transition, callback) {
//   const { pathname } = nextState.location
//   const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true'
//   if (pathname === '/user' && isLoggedIn) {
//     window.location = "/profile" //redirect to Home component
//   }
//   return callback() // go as it is.
// }

// This was placed after line 38
//  {/* <Route exact path="/profile" component={Profile} onEnter={onEnter} /> */}

function App() { 
  const [theme, setTheme] = useState('light');
  
  let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
  
  if(!mode){
    document.cookie = "mode ="+ 'dark'+';';
  }
  
  const themeToggler = (data) => {
    window.localStorage.setItem('theme', data)
    setTheme(data)
  }

  return (
    <ThemeProvider theme = {theme ==="light" ? lightTheme: darkTheme}>
    <GlobalStyles />
      <StyledApp>  
        <CartContext.Provider value={useCart([])}>
          <Router>
            <Navbar data={theme} onchange={(e) => { themeToggler(e) }}/>
            <NotificationContainer/>
              <Route exact path="/Home" component={Home} />
              <Route exact path="/user" component={AuthCredentials} />
              <Route path="/restaurants" render={() => <RestaurantsAll data={theme}/>} />
              <Route path="/res/:id" component={RestaurantsPage} />
              <Route path="/search" component={RestaurantSearch} />
              <Route path="/accessibility" component={Accessibility}/>
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/">
                <Redirect to="/Home"/>
              </Route>
              <Route exact path="/contact">
                <Redirect to="/profile"/>
              </Route>
              <Route exact path="/order-history">
                <Redirect to="/profile"/>
              </Route>
              <Layout>
              <Switch>
                <Route path='/orderItems/:id'>
                  <ProductsPage />
                </Route>
                <Route path='/cart'>
                  <CartPage />
                </Route>
                <Route path='/checkout'>
                  <CheckoutPage />
                </Route>
              </Switch>
            </Layout>
          </Router>
        </CartContext.Provider>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;