import React from 'react';
import axios from 'axios';
import $ from 'jquery'

// Notification imports
import 'react-notifications/lib/notifications.css';
import {NotificationManager} from 'react-notifications';

const prod_api = 'https://dilsefoodie.herokuapp.com';
const dev_api = "http://localhost:5000";
var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));

// This calls our notification handler
async function showNotification (type, message){
    const timer = 5000
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

class EditUserProfile extends React.Component {

    componentDidMount(){
        let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
        mode = mode.split('=')[1]
    }

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

        const response = await axios.post(prod_api + '/user/update_profile', formData, config)
        if(response.data.message){
            await showNotification ("error", "Updates failed, Please try again");
            // display the error message and  notification here
        }
        else{
            await showNotification ("success", "Updated Successfully!")
            window.sessionStorage.setItem('isLoggedIn', response.data.status);
            window.sessionStorage.setItem('userDetails', JSON.stringify(response.data.userDetails));
        }
        // setTimeout(() => {
        //    window.location.reload()
        //   }, 1000)
        
    }

    render() {
    let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
    mode = mode.split('=')[1]
    if(mode==='light')
    {
      return (
        <div className = "card-center" style={{backgroundColor: "rgb(0, 0, 0)"}}>
            <h2 style = {{backgroundColor:"#000000"}}>Edit User Profile</h2>
            <form>
                <div className="card-wide-dark" id="left">
                
                    <img src={this.state.profilePicture} alt="Avatar" className = "profilePic" name="profilePicture" />
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <input type="file" id="img" name="myImage" accept="image/*" className="w-100" onChange={this.onImageChange}/>
                   
                
                </div>
                <div id="cardData"  className="card-wide-dark" style = {{backgroundColor:"#000000"}} id="right">
                    <tr>
                        <td><label htmlFor="firstName">First Name:</label></td>
                        <td><input name="firstName" id="firstName" type="text" value={this.state.firstName} onChange={this.onChangeFirstName} /></td>
                    </tr>
                    <tr>
                        <td> <label htmlFor="lastName">Last Name:</label> </td>
                        <td> <input name="lastName" id="lastName" type="text" value={this.state.lastName} onChange={this.onChangeLastName} /></td>
                    </tr>
                    <tr>
                        <td> <label htmlFor="Email">Email:</label> </td>
                        <td> <input name="Email" id="Email" type="text" value={this.state.email} onChange={this.onChangeEmail} readOnly/> </td> 
                    </tr>
                    <tr>
                        <td> <label htmlFor="City">City:</label> </td> 
                        <td> <input name="City" id="City" type="text" value={this.state.city} onChange={this.onChangeCity} /> </td> 
                    </tr>
                    <tr>
                        <td> <label htmlFor="State">State:</label></td>
                        <td> <input name="State" id="State" type="text" value={this.state.state} onChange={this.onChangeState} /> </td>
                    </tr>
                    <tr>
                        <td> <label htmlFor="Age">Age:</label> </td>
                        <td> <input name="Age" id="Age" type="text" value={this.state.age} onChange={this.onChangeAge} /> </td>
                    </tr>
                    <tr>
                        <td> <label htmlFor="Password">Password:</label> </td>
                        <td> <input name="Password" id="Password" type="password" value={this.state.password} onChange={this.onChangePassword} /> </td>
                    </tr>
                    <button id="btn" type="submit" style = {{color:"#e8e8e8"}} className="login-btn" onClick={this.submitregister.bind(this)}>Update</button>
                </div>
            </form>
        </div>
      );
    }
else{
    return (
        <div className = "card-center">
            <h2 >Edit User Profile</h2>
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
                <div id="cardData"  className="card-wide" id="right">
                    <tr>
                        <td><label htmlFor="firstName">First Name:</label></td>
                        <td><input name="firstName" id="firstName" type="text" value={this.state.firstName} onChange={this.onChangeFirstName} /></td>
                    </tr>
                    <tr>
                        <td> <label htmlFor="lastName">Last Name:</label> </td>
                        <td> <input name="lastName" id="lastName" type="text" value={this.state.lastName} onChange={this.onChangeLastName} /></td>
                    </tr>
                    <tr>
                        <td> <label htmlFor="Email">Email:</label> </td>
                        <td> <input name="Email" id="Email" type="text" value={this.state.email} onChange={this.onChangeEmail} readOnly/> </td> 
                    </tr>
                    <tr>
                        <td> <label htmlFor="City">City:</label> </td> 
                        <td> <input name="City" id="City" type="text" value={this.state.city} onChange={this.onChangeCity} /> </td> 
                    </tr>
                    <tr>
                        <td> <label htmlFor="State">State:</label></td>
                        <td> <input name="State" id="State" type="text" value={this.state.state} onChange={this.onChangeState} /> </td>
                    </tr>
                    <tr>
                        <td> <label htmlFor="Age">Age:</label> </td>
                        <td> <input name="Age" id="Age" type="text" value={this.state.age} onChange={this.onChangeAge} /> </td>
                    </tr>
                    <tr>
                        <td> <label htmlFor="Password">Password:</label> </td>
                        <td> <input name="Password" id="Password" type="password" value={this.state.password} onChange={this.onChangePassword} /> </td>
                    </tr>
                    <button id="btn" type="submit" className="login-btn" onClick={this.submitregister.bind(this)}>Update</button>
                </div>
            </form>
        </div>
      );
    }
}
}
export default EditUserProfile;