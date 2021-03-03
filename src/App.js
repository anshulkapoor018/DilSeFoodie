import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import ReactDOM from 'react-dom';
import Footer from "./Static/Footer"
import Navbar from "./components/navbar.component"
import AuthCredentials from "./components/create-user.component";
import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";
// import NotFound from "./views/NotFound";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route exact path="/Home" component={Home} />
        <Route path="/user" component={AuthCredentials} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/">
            <Redirect to="/Home"/>
        </Route>
        <Footer/>
        {/* <Route component={NotFound}/> */}
      </div>
    </Router>
  );
}

export default App;
