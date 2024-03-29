import './Profile.css';
import Sidebar from '../../components/sidebar.component';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import EditUserProfile from "../../components/edit-user-profile.component"
import UserOrderHistory from "./user-order-history.component"
import ContactUs from './contactForm.component';
import Dark from './Settings';
import Team from '../../pages/Team';
import React from 'react';
import $ from 'jquery'


function Profile() {
  if (window.sessionStorage.getItem('isLoggedIn') === 'true' ){
    return (
      <Router>
          <Route exact path='/profile' component={Profile2} />
          <Route exact path="/contact" component={ContactUs} />
          <Route path='/settings' component={Dark} />
          <Route path='/order-history' component={UserOrderHistory} />
          <Route path='/team' exact component={Team} />
        <Sidebar />
      </Router>
    );
  }
  else{
    window.location = "/user"
  }
}

// export default Profile;
class Profile2 extends React.PureComponent {
  componentDidMount(){
    let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
    mode = mode.split('=')[1]
    if (mode === "light"){
      $("#blackslider").prop('checked',true);
    }
  }
  render() {
    let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
    mode = mode.split('=')[1]
    if(mode==='light')
    {
      var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));
      return (
        <div className='homepage'>
          <h1 style = {{backgroundColor:"#000000"}}>Welcome to your dashboard, {userObject['firstName']}!</h1>
          {/* <form action={onEnter}>
            <button type="submit" onClick={onEnter}>Logout</button>
          </form> */}
          <EditUserProfile/>
        </div>
      );
    }
    else{
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
}
export default Profile;