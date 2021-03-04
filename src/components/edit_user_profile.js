import React from 'react';
import axios from 'axios';

var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));
// This makes sure that a user is authenticated before seeing this page
function CheckSession(){
    if (window.sessionStorage.getItem('isLoggedIn') === null || window.sessionStorage.getItem('isLoggedIn') === 'false'){
        window.location = "/user"
    }
}



class EditUserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePicture: userObject['profilePicture'],
            firstName: userObject['firstName'],
            lastName: userObject['lastName'],
            email: userObject['email'],
            city: userObject['city'],
            state: userObject['state'],
            age: userObject['age'],
            password: userObject['password'],
        };
        // this.state.profilePicture = this.state.profilePicture.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.submitregister = this.submitregister.bind(this);
    }
  
    // onImage(e){
    //     const target = e.target;
    //     const value = target.src;
    //     const name = target.name; 
    //     this.setState({
    //       image: value,
    //     })
    // }

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

    onChangeCity(e){
        const target = e.target;
        const value = target.value;
        const name = target.name; 
        this.setState({
            city: value,
        })
    }

    onChangeState(e){
        const target = e.target;
        const value = target.value;
        const name = target.name; 
        this.setState({
            state: value,
        })
    }

    onChangeAge(e){
        const target = e.target;
        const value = target.value;
        const name = target.name; 
        this.setState({
            age: value,
        })
    }

    submitregister(e){
        e.preventDefault();
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            profilePicture: this.state.profilePicture,
            city: this.state.city,
            state: this.state.state,
            age: this.state.age,
        }

    }

    render() {

      return (
        <div class>
            <form submitregister={this.submitregister}>
                <h2>Edit User Profile</h2>
                <img src={this.state.profilePicture} alt="Avatar" name="profilePicture"></img>
                <label>
                    First Name:
                    <br/>
                    <input
                    name="firstName"
                    type="text"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName} />
                </label>
                <br />
                <label>
                    Last Name:
                    <br/>
                    <input
                    name="lastName"
                    type="text"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName} />
                </label>
                <br />
                <label>
                    Email:
                    <br/>
                    <input
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.onChangeEmail} readOnly/>
                </label>
                <br />
                <label>
                    City:
                    <br/>
                    <input
                    name="city"
                    type="text"
                    value={this.state.city}
                    onChange={this.onChangeCity} />
                </label>
                <br />
                <label>
                    State:
                    <br/>
                    <input
                    name="State"
                    type="text"
                    value={this.state.state}
                    onChange={this.onChangeState} />
                </label>
                <br />
                <label>
                    Age:
                    <br/>
                    <input
                    name="age"
                    type="text"
                    value={this.state.age}
                    onChange={this.onChangeAge} />
                </label>
                <br />
                <label>
                    Password:
                    <br/>
                    <input
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChangePassword} />
                </label>
                <br />
                
                
                <button
                    type="submit"
                    className="login-btn"
                    onClick={this
                    .submitregister
                    .bind(this)}>Submit</button>
            </form>
        </div>
        
      );
    }
}
export default EditUserProfile;
