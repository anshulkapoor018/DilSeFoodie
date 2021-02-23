import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className = "header">
            {/* Logo */}
            <Link className = "nav-title" to="/">
                <img className = "nav-logo" src={ "/logo192.png" } alt="React logo" />
            </Link>
            
            {/* Page Links */}
            <div className = "nav-items">
                <Link className = "nav-link" to='/Home'>Home</Link>
                <Link className = "nav-link" to='/Register'>Extra Page</Link>
                <Link className = "nav-link" to='/Signup'>Sign Up</Link>
            </div>

        </div>
    )
};
// TODO: lets add a footer and export it later
// const Footer = () => {
//     return (


//        //footdesign will go in here
//     )
// };




export default NavBar;


//TODO: export for navbar and footer

// export {NavBar, Footer};
