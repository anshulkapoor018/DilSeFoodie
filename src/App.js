import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import Navbar from "./components/navbar.component"
import CreateUser from "./components/create-user.component";
import Home from "./views/Home/Home";
// import NotFound from "./views/NotFound";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route exact path="/Home" component={Home} />
        <Route path="/user" component={CreateUser} />
        <Route exact path="/">
            <Redirect to="/Home"/>
        </Route>
        {/* <Route component={NotFound}/> */}
      </div>
    </Router>
  );
}

export default App;
