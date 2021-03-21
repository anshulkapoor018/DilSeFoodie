import React, { useState, Component } from 'react';
import axios from 'axios';
import "../styles/_loginSty.scss";
import { Card } from 'react-bootstrap'

// Notification imports
import 'react-notifications/lib/notifications.css';
import {NotificationManager} from 'react-notifications';

// This calls our notification handler
async function showNotification (type, message){
  const timer = 2000
  if (type === "error"){
    NotificationManager.error(message, "", timer);
  }
  else if (type === "success"){
    NotificationManager.success(message, "", timer);
  }
  else if (type === "warning"){
    NotificationManager.warning(message, "", timer);
  }
}

export default class AuthCredentials extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false,
    };
  }

  
  showLoginBox() {
    this.setState({isLoginOpen: true, isRegisterOpen: false});
  }

  showRegisterBox() {
    this.setState({isRegisterOpen: true, isLoginOpen: false});
  }

  render() {
    if (window.sessionStorage.getItem('isLoggedIn') === 'true'){
      window.location = "/profile"
    }
    else{
      return(
        <div className="root-container">
  
          <div className="box-controller">
            <div
              className={"controller " + (this.state.isLoginOpen
              ? "selected-controller"
              : "")}
              onClick={this
              .showLoginBox
              .bind(this)}>
              Login
            </div>
            <div
              className={"controller " + (this.state.isRegisterOpen
              ? "selected-controller"
              : "")}
              onClick={this
              .showRegisterBox
              .bind(this)}>
              Register
            </div>
          </div>
          <div className="box-container">
            {this.state.isLoginOpen && <LoginBox/>}
            {this.state.isRegisterOpen && <RegisterBox/>}
          </div>
        </div>
      )

    }
    
  }
}

//Login Box
class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
     
    };
    
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  onChangeEmail(e){
    const target = e.target;
    const value = target.value;
    // const name = target.name; 
    this.setState({
      email: value
    })
  }
  onChangePassword(e){
    const target = e.target;
    const value = target.value;
    // const name = target.name; 
    this.setState({
      password: value
    })
  }

  async submitLogin(e) {
    e.preventDefault();
    
    
    const user = {
      email: this.state.email,
      password: this.state.password
    }

    // Checking for empty inputs 
    if (user.email.length < 3 || user.email.trim() === ""){
      await showNotification ("error", "Invalid Email");
    }
    else if (user.password.length < 6 || user.password.trim() === ""){
      await showNotification ("error", "Invalid Password");
    }
    else{
      const response = await axios.post('http://localhost:5000/user/login', user)
      console.log(response.data.message)
      if (response.data.message){
        await showNotification ("error", "Wrong email or password");
      }
      else{
            
        if (response.data.redirect === '/') {
          window.sessionStorage.setItem('isLoggedIn', response.data.status);
          window.sessionStorage.setItem('userDetails', JSON.stringify(response.data.userDetails));

          await showNotification ("success", "Login Successful")
          
          // add a delay for 2 seconds 
          setTimeout(() => {
            window.location = "/profile"
          }, 1000)
        
        } 
      
        else if (response.data.redirect === '/login'){
          window.location = "/user"
        }
      }

    }
  
    this.setState({
      email: this.state.email,
      password: this.state.password
    })      

  }
  
  render() {
   
    return (
      <div className="inner-container">
        <div className="box">
          <form>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" className="login-input" value={this.state.email}
                onChange={this.onChangeEmail}placeholder="Email"/>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                value={this.state.password}
                onChange={this.onChangePassword}
                placeholder="Password"/>
            </div>

            <button
              type="submit"
              className="login-btn"
              onClick={this
              .submitLogin
              .bind(this)}>Login</button>
          </form>
          <br/>
          
          {this.state.err_status ? <div class="alert alert-danger" role="alert">
            {this.state.message}
          </div> : ""}
          {this.state.succes_status ? <div class="alert alert-success" role="alert">
            {this.state.message}
          </div> : ""}
               
        </div>
      </div>
    );
  }

}

//Register Box 
class RegisterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.submitregister = this.submitregister.bind(this);
  }

  onChangeFirstName(e){
    const target = e.target;
    const value = target.value;
    const name = target.name; 
    this.setState({
      firstName: value,
    })
  }
  onChangeLastName(e){
    const target = e.target;
    const value = target.value;
    const name = target.name; 
    this.setState({
      lastName: value,
    })
  }
  onChangeEmail(e){
    const target = e.target;
    const value = target.value;
    const name = target.name; 
    this.setState({
      email: value,
    })
  }
  onChangePassword(e){
    const target = e.target;
    const value = target.value;
    const name = target.name; 
    this.setState({
      password: value,
    })
  }

  async submitregister(e) {
    e.preventDefault();

    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }

    if (user.firstName.length < 1 || user.firstName.trim() === ""){
      await showNotification ("error", "Invalid Firstname")
    }
    else if (user.lastName.length < 1 || user.lastName.trim() === ""){
      await showNotification ("error", "Invalid Lastname")
    }
    else if (user.email.length < 3 || user.email.trim() === ""){
      await showNotification ("error", "Invalid Email")
    }
    else if (user.password.length < 6 || user.password.trim() === ""){
      await showNotification ("error", "Invalid Password")
    }
   
    else{
      const response = await axios.post('http://localhost:5000/user/signup', user)
      console.log(response.data.success)
      if(response.data.email_use === true){
        await showNotification ("error", "Sign up failed, Email Already Exists!")
      }
      else if (response.data.success === false){
        await showNotification ("error", "Sign up failed, Please try again!")
      }
      else if (response.data.success === true){
        await showNotification ("success", "You have Successfully Signed up!")
        setTimeout(() => {
          window.location = "/user"
        }, 1500)
      }
      
    }

    
   

    this.setState({
      firstName: this.state.firstName,
      LastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    })
  }

  render() {
    return (
      <div className="inner-container">
        <div className="box">
          <form>
            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                className="login-input"
                value={this.state.firstName}
                onChange={this.onChangeFirstName}
                placeholder="First Name"/>
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="login-input"
                value={this.state.lastName}
                onChange={this.onChangeLastName}
                placeholder="Last Name"/>
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" className="login-input" value={this.state.email}
                onChange={this.onChangeEmail}placeholder="Email"/>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                value={this.state.password}
                onChange={this.onChangePassword}
                placeholder="Password"/>
            </div>
            <button
              type="submit"
              className="login-btn"
              onClick={this
              .submitregister
              .bind(this)}>Register</button>
          </form>

          <br/>
          
          {this.state.error_status ? <div class="alert alert-danger" role="alert">
            {this.state.message}
          </div> : ""}
          {this.state.success_status ? <div class="alert alert-success" role="alert">
            {this.state.message}
          </div> : ""}
        </div>   
      </div>
    );
  }
}
