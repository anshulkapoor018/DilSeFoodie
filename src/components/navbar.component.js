import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.component.css';

const NavBar = () => {
    if (window.sessionStorage.getItem('isLoggedIn') === null || window.sessionStorage.getItem('isLoggedIn') === 'false'){
        return (
            <div className = "header">
                {/* Logo */}
                <Link className = "nav-title" to="/">
                    <img className = "nav-logo" src={ "/logo.png" } alt="React logo" />
                </Link>

                {/* Page Links */}
                <div className = "nav-items">
                    <Link className = "nav-link" to='/Home'>Home</Link>
                    <Link className = "nav-link" to='/restaurants'>Restaurants</Link>
                    <Link className = "nav-link" to='/user'>Signup</Link>
                </div>
            </div>
        )
    } else {
        var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));
        return (
            <div className = "header">
                {/* Logo */}
                <Link className = "nav-title" to="/">
                    <img className = "nav-logo" src={ "/logo.png" } alt="React logo" />
                </Link>
    
                {/* Page Links */}
                <div className = "nav-items">
                    <Link className = "nav-link" to='/Home'>Home</Link>
                    <Link className = "nav-link" to='/restaurants'>Restaurant</Link>
                    <Link className = "nav-link" to='/profile'>{userObject['firstName']}</Link>
                </div>
    
            </div>
        )
    }

};

export default NavBar;
