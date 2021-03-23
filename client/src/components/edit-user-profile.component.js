import React from 'react';
import axios from 'axios';

var dummyProfilePic = "https://res.cloudinary.com/helpinghands101/image/upload/v1615598217/user_mcyfxd.png"
var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));

// This makes sure that a user is authenticated before seeing this page
// function CheckSession(){
//     if (window.sessionStorage.getItem('isLoggedIn') === null || window.sessionStorage.getItem('isLoggedIn') === 'false'){
//         window.location = "/user"
//     }
// }
function update(value){
    let prevData = JSON.parse(sessionStorage.getItem('userDetails'));
    Object.keys(value).forEach(function(val, key){
         prevData[val] = value[val];
    })
    sessionStorage.setItem('userDetails', JSON.stringify(prevData));
}

class EditUserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
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
        this.onImageChange = this.onImageChange.bind(this);
    }
  
    onImageChange(e){
        this.setState({
            file: e.target.files[0],
            profilePicture: URL.createObjectURL(e.target.files[0])
        });
    }

    onChangeFirstName(e){
        const target = e.target;
        const value = target.value;
        // const name = target.name; 
        this.setState({
          firstName: value,
        })
    }

    onChangeLastName(e){
        const target = e.target;
        const value = target.value;
        // const name = target.name; 
        this.setState({
            lastName: value,
        })
    }

    onChangeEmail(e){
        const target = e.target;
        const value = target.value;
        // const name = target.name; 
        this.setState({
            email: value,
        })
    }

    onChangePassword(e){
        const target = e.target;
        const value = target.value;
        // const name = target.name; 
        this.setState({
            password: value,
        })
    }

    onChangeCity(e){
        const target = e.target;
        const value = target.value;
        // const name = target.name; 
        this.setState({
            city: value,
        })
    }

    onChangeState(e){
        const target = e.target;
        const value = target.value;
        // const name = target.name; 
        this.setState({
            state: value,
        })
    }

    onChangeAge(e){
        const target = e.target;
        const value = target.value;
        // const name = target.name; 
        this.setState({
            age: value,
        })
    }

    submitregister(e){
        e.preventDefault();
        var self = this;
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

        axios.post('http://localhost:5000/user/update_profile', user)
        .then(function (response) {
            console.log(response.data.userDetails);
            self.setState({
                profilePicture: response.data.userDetails.profilePicture,
                firstName: response.data.userDetails.firstName,
                lastName: response.data.userDetails.lastName
            })
            if (response.data.redirect === '/profile') {
                window.location.href = "/profile"
            }
        })
        window.location.reload();
    }

    uploadProfilePic(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('img', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:5000/user/upload",formData, config)
            .then((response) => {
                console.log(response.data.url);
                update({profilePicture: response.data.url});
                this.setState({profilePicture: response.data.url});
            }).catch((error) => {
        });
    }

    render() {
      return (
        <div className = "card-center">
            <h2>Edit User Profile</h2>
            <div className="card-wide" id="left">
                <img src={this.state.profilePicture} alt="Avatar" className = "profilePic" name="profilePicture" />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <input type="file" id="img" name="img" accept="image/*" className="w-100" onChange={this.onImageChange}/>
                <input type="submit" value="Upload Photo" onClick={this.uploadProfilePic.bind(this)}/> 
            </div>
            <div className="card-wide" id="right">
                <form submitregister={this.submitregister}>
                    <label htmlFor="firstName">First Name:</label>
                    <input name="firstName" id="firstName" type="text" value={this.state.firstName} onChange={this.onChangeFirstName} />
                    <label htmlFor="lastName">Last Name:</label>
                    <input name="lastName" id="lastName" type="text" value={this.state.lastName} onChange={this.onChangeLastName} />
                    <label htmlFor="Email">Email:</label>
                    <input name="Email" id="Email" type="text" value={this.state.email} onChange={this.onChangeEmail} readOnly/>
                    <label htmlFor="City">City:</label>
                    <input name="City" id="City" type="text" value={this.state.city} onChange={this.onChangeCity} />
                    <label htmlFor="State">State:</label>
                    <input name="State" id="State" type="text" value={this.state.state} onChange={this.onChangeState} />
                    <label htmlFor="Age">Age:</label>
                    <input name="Age" id="Age" type="text" value={this.state.age} onChange={this.onChangeAge} />
                    <label htmlFor="Password">Password:</label>
                    <input name="Password" id="Password" type="password" value={this.state.password} onChange={this.onChangePassword} />
                    <button id="btn" type="submit" className="login-btn" onClick={this.submitregister.bind(this)}>Submit</button>
                </form>
            </div>
        </div>
      );
    }
}


export default EditUserProfile;