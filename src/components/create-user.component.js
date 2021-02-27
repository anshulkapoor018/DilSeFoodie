import React, { Component } from 'react';
import axios from 'axios';
import "../styles/_loginSty.scss";

export default class AuthCredentials extends Component {
// export default class CreateUser extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username: ''
  //   }

  //   this.onChangeUsername = this.onChangeUsername.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);

   
  // }

  // onChangeUsername(e) {
  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name
  //   this.setState({
  //     username: value
  //   })
  // }

  // onSubmit(e) {
  //   e.preventDefault();

  //   const user = {
  //     username: this.state.username
  //   }

  //   console.log(user);

  //   axios.post('http://localhost:5000/user', user)
  //     .then(res => console.log(res.data));

  //   this.setState({
  //     username: ''
  //   })
  // }
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
  }

  showLoginBox() {
    this.setState({isLoginOpen: true, isRegisterOpen: false});
  }

  showRegisterBox() {
    this.setState({isRegisterOpen: true, isLoginOpen: false});
  }

  render() {
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
    
    // return (
    //   <div>
    //     <h3>Sign Up Form</h3>
    //     <form onSubmit={this.onSubmit}>
    //       <div className="form-group"> 
    //         <label>Username: </label>
    //         <input  type="text"
    //             required
    //             name = "username"
    //             className="form-control"
    //             value={this.state.username}
    //             onChange={this.onChangeUsername}
    //           />
    //         <input  type="text"
    //             required
    //             name = "username"
    //             className="form-control"
    //             value={this.state.username}
    //             onChange={this.onChangeUsername}
    //           />
    //       </div>
    //       <div className="form-group">
    //         <input type="submit" value="Create User" className="btn btn-primary" />
    //       </div>
    //     </form>
    //   </div>
    // )
  }
}

//Login Box
class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  submitLogin(e) {}

  render() {
    return (
      <div className="inner-container">
        <div className="header">
          Login
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              placeholder="Email"/>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"/>
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this
            .submitLogin
            .bind(this)}>Login</button>
        </div>
      </div>
    );
  }
}

//Register Box 
class RegisterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  submitRegister(e) {}

  render() {
    return (
      <div className="inner-container">
        <div className="header">
          Register
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              className="login-input"
              placeholder="First Name"/>
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="login-input"
              placeholder="Last Name"/>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className="login-input" placeholder="Email"/>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"/>
          </div>
          <button
            type="button"
            className="login-btn"
            onClick={this
            .submitRegister
            .bind(this)}>Register</button>
        </div>
      </div>
    );
  }
}
