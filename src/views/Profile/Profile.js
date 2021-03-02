import React from 'react';

class Profile extends React.PureComponent {
  render() {
    var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));
    return (
      <div className='homepage'>
        <h1>Welcome to your dashboard, {userObject['firstName']}!</h1>
      </div>
    );
  }
}

export default Profile;