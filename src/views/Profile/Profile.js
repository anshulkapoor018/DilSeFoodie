import './Profile.css';
import Sidebar from '../../components/Sidebar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import EditUserProfile from "../../components/edit_user_profile"
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from '../../pages/Reports';
import Team from '../../pages/Team';
import axios from 'axios';
import Header from "../../views/Header/Header";

import React from 'react';


function Profile() {
  
  if (window.sessionStorage.getItem('isLoggedIn') === null || window.sessionStorage.getItem('isLoggedIn') === 'false'){
    window.location = "/user"
  }
  
  return (
    <Router>
      <Sidebar />
      <Profile2/>
      <Switch>
        <Route path='/overview' exact component={EditUserProfile} />
        <Route path='/reports' exact component={Reports} />
        <Route path='/reports/reports1' exact component={ReportsOne} />
        <Route path='/reports/reports2' exact component={ReportsTwo} />
        <Route path='/reports/reports3' exact component={ReportsThree} />
        <Route path='/team' exact component={Team} />
      </Switch>
     
    </Router>
  );
}

// export default Profile;
class Profile2 extends React.PureComponent {
  
  render() {
    
    var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));
    
    return (
      
      <div className='homepage'>
        <h1>Welcome to your dashboard, {userObject['firstName']}!</h1>
        {/* <form action={onEnter}>
          <button type="submit" onClick={onEnter}>Logout</button>
        </form> */}
      </div>
    );
  }
}

export default Profile;