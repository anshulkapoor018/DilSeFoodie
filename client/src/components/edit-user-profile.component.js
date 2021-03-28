import React from 'react';
import axios from 'axios';

const prod_api = 'https://dilsefoodie.herokuapp.com';
const dev_api = "http://localhost:5000";
var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));


// This makes sure that a user is authenticated before seeing this page
// function CheckSession(){
//     if (window.sessionStorage.getItem('isLoggedIn') === null || window.sessionStorage.getItem('isLoggedIn') === 'false'){
//         window.location = "/user"
//     }
// }
// function update(value){
//     let prevData = JSON.parse(sessionStorage.getItem('userDetails'));
//     Object.keys(value).forEach(function(val, key){
//          prevData[val] = value[val];
//     })
//     sessionStorage.setItem('userDetails', JSON.stringify(prevData));
// }

class EditUserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: userObject['profilePicture'],
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

    async submitregister(e){
        e.preventDefault();

        const formData = new FormData();

        formData.append('myImage', this.state.file);
        formData.append('email', this.state.email);
        formData.append('firstName', this.state.firstName);
        formData.append('lastName', this.state.lastName);
        formData.append('password', this.state.password);
        formData.append('age', this.state.age);
        formData.append('city', this.state.city);
        formData.append('state', this.state.state);
       
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        const response = await axios.post(dev_api + '/user/update_profile', formData, config)
        if(response.data.message){
            console.log(response.data.message)
            // display the error message and  notification here
        }
        else{
            window.sessionStorage.setItem('isLoggedIn', response.data.status);
            window.sessionStorage.setItem('userDetails', JSON.stringify(response.data.userDetails));
        }
        window.location.reload()
    }

    render() {
      return (
        <div className = "card-center">
            <h2>Edit User Profile</h2>
            <form>
                <div className="card-wide" id="left">
                
                    <img src={this.state.profilePicture} alt="Avatar" className = "profilePic" name="profilePicture" />
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <input type="file" id="img" name="myImage" accept="image/*" className="w-100" onChange={this.onImageChange}/>
                   
                
                </div>
                <div className="card-wide" id="right">
                
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
                
                </div>
            </form>
        </div>
      );
    }
}

export default EditUserProfile;