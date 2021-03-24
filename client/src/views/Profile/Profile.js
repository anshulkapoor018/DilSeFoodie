import './Profile.css';
import Sidebar from '../../components/sidebar.component';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import EditUserProfile from "../../components/edit-user-profile.component"
import ContactUs from '../../components/contactForm.component';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from '../../pages/Reports';
import Team from '../../pages/Team';
import React from 'react';

function Profile() {
  if (window.sessionStorage.getItem('isLoggedIn') === 'true'){
    return (
      <Router>
        <Sidebar />
        <Switch>
          <Route path='/profile' exact component={Profile2} />
          <Route  path="/contact" component={ContactUs} />
          <Route path='/reports' exact component={Reports} />
          <Route path='/reports/reports1' exact component={ReportsOne} />
          <Route path='/reports/reports2' exact component={ReportsTwo} />
          <Route path='/reports/reports3' exact component={ReportsThree} />
          <Route path='/team' exact component={Team} />
        </Switch>
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