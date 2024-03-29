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
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import './App.css';
import CartContext from './cart/context';
import useCart from './hooks/use-cart';

import Layout from './layout';
import ProductsPage from './pages/products';
import CartPage from './pages/cart';
import CheckoutPage from './pages/checkout';
import $ from 'jquery'

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
  background-image:  url('${props => props.theme.background}');
  background-size: cover;
  background-attachment:fixed;
  min-height: 300vh;
  `;

function App(props) {
  let res = 'light'
  let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
  if(!mode){
    document.cookie = "mode ="+ 'dark'+';';
  }
  else{
    res = mode.split('=')[1]
    if(res==='dark'){
      res = 'light'
      $("#blackslider").prop('checked',false);
    }else{
      $("#blackslider").prop('checked',true);
      res = 'dark'
    }
  }
  const [theme, setTheme] = useState(res);


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
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/">
              <Redirect to="/Home"/>
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