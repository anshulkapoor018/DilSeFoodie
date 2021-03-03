import './Profile.css';
import Sidebar from '../../components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Overview from '../../pages/Overview';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from '../../pages/Reports';
import Team from '../../pages/Team';



import React from 'react';


function Profile() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path='/overview' exact component={Overview} />
        <Route path='/reports' exact component={Reports} />
        <Route path='/reports/reports1' exact component={ReportsOne} />
        <Route path='/reports/reports2' exact component={ReportsTwo} />
        <Route path='/reports/reports3' exact component={ReportsThree} />
        <Route path='/team' exact component={Team} />
      </Switch>
    </Router>
  );
}

export default Profile;
// class Profile extends React.PureComponent {
//   render() {
//     var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));
//     return (
//       <div className='homepage'>
//         <h1>Welcome to your dashboard, {userObject['firstName']}!</h1>
//       </div>
//     );
//   }
// }

// export default Profile;