import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './navbar.component.css';
import styled,{ThemeProvider} from "styled-components";
import {lightTheme, darkTheme, GlobalStyles} from "../themes.js";
import $ from 'jquery'; 


const NavBar = (props) => {
    let path = '/user';
    let name = 'Signup';
    
   
    const handleChange = event => {
        var x;
        props.data === "light" ? x="dark" : x="light";
        props.onchange(x);
        var abc = document.getElementsByClassName("cardDark");
        if(props.data === "light"){
            $('.controllers').addClass('controllers-dark').removeClass('controllers');
            $('.selected-controllers').addClass('selected-controllers-dark').removeClass('selected-controllers');            
            $('.search-card-center').addClass('search-card-center-dark').removeClass('search-card-center');
            $('h1').css({"background-color":"#000000"});
            $('h2').css({"background-color":"#000000"});
            $('p').css({"color":"#b4fffb"});
            $('button').css({"color":"#e8e8e8"});
            $('.searchFields').css({"background":"black"});
            $('.card').css({"background-color":"#000"});
            $('.card-center').css({"background-color":"#000000"});
            $('.card-wide').css({"background-color":"#000000"});
            $('.jumbotron').css({"background-color":"#000000"});
            
        }
        if(props.data === "dark"){
            $('.controllers-dark').addClass('controllers').removeClass('controllers-dark');
            $('.selected-controllers-dark').addClass('selected-controllers').removeClass('selected-controllers-dark');
            $('.search-card-center-dark').addClass('search-card-center').removeClass('search-card-center-dark');
            $('h1').css({"background-color":"#fafafa"});
            $('h2').css({"background-color":"#fafafa"});
            $('p').css({"color":"#001514"});
            $('button').css({"color":"#212529"});
            $('.searchFields').css({"background":"white"});
            $('.card').css({"background-color":"#fff"});
            $('.card-center').css({"background-color":"#fafafa"});
            $('.card-wide').css({"background-color":"#fafafa"});
            $('.jumbotron').css({"background-color":"#fafafa"});
        }
      
    }

    

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
                <Link className = "nav-link" to='/restaurants'>Restaurant</Link>
                <Link className = "nav-link" to={path}>{name}</Link>
                <label class="switch">
                <input type="checkbox"  onClick= {handleChange}/>
                <span class="slider round"/>
                </label>
            </div>
        </div>
    )
};

export default NavBar;