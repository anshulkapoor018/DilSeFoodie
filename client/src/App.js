import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import Signup from "./views/auth/user_signup";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBarFooter";
import Footer from './Common/Footer';

const App = () => {
  return (
    <div>
      <NavBar/>
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Signup" component={Signup} />
        <Route exact path="/">
          <Redirect to="/Home"/>
        </Route>
        <Route component={NotFound}/>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
