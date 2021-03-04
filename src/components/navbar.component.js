import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.component.css';

const NavBar = () => {
    let path = '/user';
    let name = 'Signup';

    if (window.sessionStorage.getItem('isLoggedIn') === null || window.sessionStorage.getItem('isLoggedIn') === 'false'){
        path = path;
        name = name;
    }
    else{
        var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));
        path = '/profile';
        name = userObject['firstName'];
    }
    return (
        <div className = "header">
            {/* Logo */}
            <Link className = "nav-title" to="/">
                <img className = "nav-logo" src={ "/logo.png" } alt="React logo" />
            </Link>

            {/* Page Links */}
            <div className = "nav-items">
                <Link className = "nav-link" to='/Home'>Home</Link>
                <Link className = "nav-link" to='/Restaurant'>Restaurant</Link>
                <Link className = "nav-link" to={path}>{name}</Link>
            </div>
        </div>
    )
};

export default NavBar;