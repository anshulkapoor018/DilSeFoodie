import './Profile.css';
import Sidebar from '../../components/sidebar.component';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import EditUserProfile from "../../components/edit-user-profile.component"
import UserOrderHistory from "./user-order-history.component"
import ContactUs from './contactForm.component';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from '../../pages/Reports';
import Team from '../../pages/Team';
import React from 'react';

function Profile() {
  if (window.sessionStorage.getItem('isLoggedIn') === 'true' ){
    return (
      <Router>
       
        {/* <Switch> */}
          <Route exact path='/profile' component={Profile2} />
          <Route exact path="/contact" component={ContactUs} />
          <Route path='/reports' exact component={Reports} />
          <Route path='/order-history' component={UserOrderHistory} />
          <Route path='/reports/reports1' exact component={ReportsOne} />
          <Route path='/reports/reports2' exact component={ReportsTwo} />
          <Route path='/reports/reports3' exact component={ReportsThree} />
          <Route path='/team' exact component={Team} />
          <Sidebar />
        {/* </Switch> */}
      </Router>
    );
  }
  else{
    window.location = "/user"
  }
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
        <EditUserProfile/>
      </div>
    );
  }
}

export default Profile;