import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
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

    if (window.sessionStorage.getItem('isLoggedIn') !== null && window.sessionStorage.getItem('isLoggedIn') !== 'false'){
        var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));
        path = '/profile';
        name = userObject['firstName'];
    }
    return (
        <div className = "header app-nav">
            <Link className = "nav-title" to="/">
                <img className = "nav-logo" src={ "/logo.png" } alt="DilSeFoodie logo" />
                <span>DilSeFoodie</span>
            </Link>

            <div className = "nav-items">
                <Link className = "nav-link" to='/Home'>Home</Link>
                <Link className = "nav-link" to='/restaurants'>Restaurants</Link>
                <Link className = "nav-link nav-link--account" to={path}>{name}</Link>
                <label className="switch" title="Toggle theme">
                    <FaSun className="switch-icon switch-icon--sun" />
                    <input id = "blackslider" type="checkbox" onClick= {handleChange} />
                    <span className="slider round"/>
                    <FaMoon className="switch-icon switch-icon--moon" />
                </label>
            </div>
        </div>
    )
};

export default NavBar;
