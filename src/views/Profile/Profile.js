import React from 'react';
import { Redirect } from 'react-router-dom';


class Profile extends React.PureComponent {
  constructor(props){
    super(props);

    // Session isnt coming in here
    console.log(this.status)
    this.loggedIn = sessionStorage.getItem('LoggedIn') === 'true';
    this.status = sessionStorage.getItem('LoggedIn') === 'true';
    console.log(this.loggedIn)
   
  }


  
  render() {
    if(!this.loggedIn){  // This is not working
      return <Redirect to='/user'/>;
    }

    return (
      
      
      <div className='homepage'>
        <h1>Welcome to your dashboard</h1>
      </div>
    );
  }
}

export default Profile;


