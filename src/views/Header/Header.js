import React, { Component } from 'react';

class Header extends Component {
    
    logout = () => {
        sessionStorage.removeItem("userToken");
        sessionStorage.clear(); 
        window.location = "/user"
    }
    
    render() {
        return (
            <div>
              <button type='button' onClick={this.logout}>Log Out</button>
            </div>
        )
    }
}
export default Header;