import axios from 'axios';
import React from 'react';

// Notification imports
import 'react-notifications/lib/notifications.css';
import {NotificationManager} from 'react-notifications';

const prod_api = 'https://dilsefoodie.herokuapp.com';
const dev_api = "http://localhost:5000";

// This calls our notification handler
async function showNotification (type, message){
    const timer = 3000
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

var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));
  
export default class ContactUs extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          name: userObject['firstName'] + " " + userObject['lastName'],
          email: userObject['email'],
          subject: "",
          message: "",
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);

    }

    onChangeName(e){
        const target = e.target
        const value = target.value
        this.setState({
            name: value
        })
    }

    onChangeEmail(e){
        const target = e.target
        const value = target.value
        this.setState({
            email: value
        })
    }

    onChangeSubject(e){
        const target = e.target
        const value = target.value
        this.setState({
            subject: value
        })
    }

    onChangeMessage(e){
        const target = e.target
        const value = target.value
        this.setState({
            message: value
        })
    }

    async onSubmitForm(e) {
        e.preventDefault();
        const form = {
            name: userObject['firstName'] + " " + userObject['lastName'],
            email: userObject["email"],
            subject: this.state.subject, 
            message: this.state.message
        }
    
        // Checking for empty inputs 
        window.sessionStorage.setItem('LoggedIn', "true")
        if (form.subject.length < 2 || form.subject.trim() === ""){
            await showNotification ("error", "Invalid Subject");
        }
        else if (form.message.length < 2 || form.message.trim() === ""){
            await showNotification ("error", "Invalid Message");
         
        }
        else{
            const response = await axios.post(prod_api + '/user/contact', form)
            console.log(response.data.message)
            if (response.data.success === false && response.data.redirect === '/contact'){
                await showNotification ("error", "Email Failed to send, Please contact Admin");
               
            }
            else{
                // if message sending is successfull
                await showNotification ("success", "Email sent")
            }
        }
        this.setState({
            name: userObject['firstName'] + " " + userObject['lastName'],
            email: userObject['email'],
            subject: this.state.subject, 
            message: this.state.message
        })      
    }

    render(){
        let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
        mode = mode.split('=')[1]
        if(mode==='light')
        {
        return(
            <div>
                <h1 style = {{backgroundColor:"#000000"}}>Submit a request or Complain</h1>
                <div className="container">
                    <form>
                            <div className="row pt-5 mx-auto">
                                <div className="col-8 form-group mx-auto">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" onChange={this.onChangeName} value={this.state.name} placeholder="Name" name="name" disabled="disabled"/>
                                </div>
                                <div className="col-8 form-group pt-2 mx-auto">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" onChange={this.onChangeEmail} value={this.state.email} placeholder="Email Address" name="email" disabled="disabled"/>
                                </div>
                                <div className="col-8 form-group pt-2 mx-auto">
                                    <label htmlFor="subject">Enter a Subject</label>
                                    <input type="text" className="form-control" onChange={this.onChangeSubject} value={this.state.Subject} placeholder="Subject" name="subject"/>
                                </div>
                                <div className="col-8 form-group pt-2 mx-auto">
                                    <label htmlFor="message">Type a Message</label>
                                    <textarea className="form-control" id="" cols="30" rows="8" onChange={this.onChangeMessage} value={this.state.message} placeholder="Your message" name="message"></textarea>
                                </div>
                                <div className="col-8 pt-3 mx-auto">
                                    <input type="submit" className="btn btn-info" onClick={this.onSubmitForm.bind(this)} placeholder="Send Message" value="Send Message"></input>
                                </div>
                            </div>
                    </form>
                </div>
            </div>
        )
    }
    else{
        return(
            <div>
                <h1>Submit a request or Complain</h1>
                <div className="container">
                    <form>
                            <div className="row pt-5 mx-auto">
                                <div className="col-8 form-group mx-auto">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" onChange={this.onChangeName} value={this.state.name} placeholder="Name" name="name" disabled="disabled"/>
                                </div>
                                <div className="col-8 form-group pt-2 mx-auto">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" onChange={this.onChangeEmail} value={this.state.email} placeholder="Email Address" name="email" disabled="disabled"/>
                                </div>
                                <div className="col-8 form-group pt-2 mx-auto">
                                    <label htmlFor="subject">Enter a Subject</label>
                                    <input type="text" className="form-control" onChange={this.onChangeSubject} value={this.state.Subject} placeholder="Subject" name="subject"/>
                                </div>
                                <div className="col-8 form-group pt-2 mx-auto">
                                    <label htmlFor="message">Type a Message</label>
                                    <textarea className="form-control" id="" cols="30" rows="8" onChange={this.onChangeMessage} value={this.state.message} placeholder="Your message" name="message"></textarea>
                                </div>
                                <div className="col-8 pt-3 mx-auto">
                                    <input type="submit" className="btn btn-info" onClick={this.onSubmitForm.bind(this)} placeholder="Send Message" value="Send Message"></input>
                                </div>
                            </div>
                    </form>
                </div>
            </div>
        )
    }
}
}