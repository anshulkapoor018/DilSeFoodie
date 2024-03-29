import React, { Component } from 'react';

class Header extends Component {
    
    logout = () => {
        sessionStorage.removeItem("userToken");
        sessionStorage.clear(); 
        window.sessionStorage.setItem('isLoggedIn', "false")
        window.location = "/user"
    }
    
    render() {
        return (
            <div className="container">
              <button type='button' onClick={this.logout}>Log Out</button>
            </div>
        )
    }
}
export default Header;