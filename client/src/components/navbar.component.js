import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.component.css';

function NavBar(props) {
    let path = '/user';
    let name = 'Signup';
    
    const handleChange = event => {
        var x;
        props.data === "light" ? x="dark" : x="light";
        props.onchange(x);
        document.cookie = "mode ="+ props.data+';';
    }

    if (window.sessionStorage.getItem('isLoggedIn') === null || window.sessionStorage.getItem('isLoggedIn') === 'false'){
        path = path;
        name = name;
    } else{
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
                <Link className = "nav-link" style = {{fontSize: "1.3em"}} to='/Home'>Home</Link>
                <Link className = "nav-link" style = {{fontSize: "1.3em"}} to='/restaurants'>Restaurant</Link>
                <Link className = "nav-link" style = {{fontSize: "1.3em"}} to={path}>{name}</Link>
                <label class="switch">
                    <input id = "blackslider" type="checkbox" onClick= {handleChange} />
                    <span class="slider round"/>
                </label>
            </div>
        </div>
    )
};

export default NavBar;