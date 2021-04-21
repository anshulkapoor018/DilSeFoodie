import React, { Component } from 'react';
import Cart from '../../cart';
import axios from 'axios';
import Header from '../../layout/header';
import './styles.css';

// Notification imports
import 'react-notifications/lib/notifications.css';
import {NotificationManager} from 'react-notifications';

const prod_api = 'https://dilsefoodie.herokuapp.com';
const dev_api = "http://localhost:5000";

// This calls our notification handler
async function showNotification (type, message){
  const timer = 1500
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

export default class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeliveryViewOpen: true,
      isPickupViewOpen: false
    };
  }

  showListView() {
    this.setState({isDeliveryViewOpen: true, isPickupViewOpen: false});
  }

  showPickupView() {
    this.setState({isPickupViewOpen: true, isDeliveryViewOpen: false});
  }

  render() {
    let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
    mode = mode.split('=')[1]
    if(mode==='light')
    {
      return(
        <div className="root-containers">
          <div className="box-controllers">
            <div className={"controllers-dark " + (this.state.isDeliveryViewOpen ? "selected-controllers-dark" : "")} onClick={this.showListView.bind(this)}> 
            Delivery
            </div>
            <div className={"controllers-dark " + (this.state.isPickupViewOpen ? "selected-controllers-dark" : "")} onClick={this.showPickupView.bind(this)}>
            Pickup
            </div>
          </div>
          <div style={{ height: '75vh', width: '100%' }} className="card-fulls">
            {this.state.isDeliveryViewOpen && <Delivery/>}
            {this.state.isPickupViewOpen && <Pickup />}
          </div>
        </div>
      )
  } else{
    return(
      <div className="root-containers">
        <div className="box-controllers">
          <div className={"controllers " + (this.state.isDeliveryViewOpen ? "selected-controllers" : "")} onClick={this.showListView.bind(this)}> 
          Delivery
          </div>
          <div className={"controllers " + (this.state.isPickupViewOpen ? "selected-controllers" : "")} onClick={this.showPickupView.bind(this)}>
          Pickup
          </div>
        </div>
        <div style={{ height: '75vh', width: '100%' }} className="card-fulls">
          {this.state.isDeliveryViewOpen && <Delivery/>}
          {this.state.isPickupViewOpen && <Pickup />}
        </div>
      </div>
    )
  }
}
}

class Pickup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      mobile: ""
    };
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
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

  onChangeMobile(e){
    const target = e.target;
    const value = target.value;
    // const name = target.name; 
    this.setState({
      mobile: value,
    })
  }

  async submitCheckoutDetails(e) {
    e.preventDefault();
    const orderDetails = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      mobile: this.state.mobile
    }

    if (orderDetails.firstName.length < 1 || orderDetails.firstName.trim() === ""){
      await showNotification ("error", "Invalid Firstname")
    }
    else if (orderDetails.lastName.length < 1 || orderDetails.lastName.trim() === ""){
      await showNotification ("error", "Invalid Lastname")
    }
    else if (orderDetails.mobile.length < 1 || orderDetails.mobile.trim() === "" || orderDetails.mobile.length !== 10){
      await showNotification ("error", "Invalid Mobile Number")
    }
    else{
      var userId = JSON.parse(window.sessionStorage.getItem("userDetails"))["_id"];
      const currentResID = window.sessionStorage.getItem('resID');
      const currentCartTotal = window.sessionStorage.getItem('cartTotal');
      const currentCartItems = window.sessionStorage.getItem('cartItems');

      var datetime = Date().toLocaleString();

      const orderPostBody = {
        restaurantId: currentResID,
        userId: userId,
        payment: currentCartTotal,
        typeOfOrder: "Pickup",
        timeOfOrder: datetime,
        orderStatus: "atRestaurant",
        orderItems : JSON.parse(currentCartItems)
      }
      await axios.post(prod_api + '/order/placeOrder', orderPostBody)
      .then(function (response) {
        console.log(response.data);
      })
      this.routeToOrderHistory();
    }

    this.setState({
      firstName: "",
      LastName: "",
      mobile: ""
    })
  }

  routeToLogin(e){
    e.preventDefault()
    window.location = "/user"
  }

  async routeToOrderHistory(){
    await showNotification ("success", "Successfully Placed Order!")
    setTimeout(() => {
      window.location = "/profile"
    }, 1500)
  }

  render(){
    var isLoggedIn = JSON.parse(window.sessionStorage.getItem("isLoggedIn"));
    let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
    mode = mode.split('=')[1]
    if(mode==='light')
      {
      return(
        <div className="containerCheckout">
        <Header/>
        <h1>Pickup Your Meal</h1>
        <div className="form" style ={{backgroundColor:"#000000"}}>
          <div className="fields fields--3">
            <label className="field">
              <span className="field__label" htmlFor="firstname">First name</span>
              <input className="field__input" type="text" id="firstname" value={this.state.firstName} onChange={this.onChangeFirstName}/>
            </label>
            <label className="field">
              <span className="field__label" htmlFor="lastname">Last name</span>
              <input className="field__input" type="text" id="lastname" value={this.state.lastName} onChange={this.onChangeLastName}/>
            </label>
            <label className="field">
              <span className="field__label" htmlFor="mobile">Mobile Number</span>
              <input className="field__input" type="tel" id="mobile" value={this.state.mobile} placeholder="123-456-7890" pattern="[1-9]{3}-[0-9]{3}-[0-9]{3}" onChange={this.onChangeMobile} required/>
            </label>
          </div>
        </div>
        <hr/>
        {isLoggedIn
        ? <button type="submit" className="button" onClick={this.submitCheckoutDetails.bind(this)}>
          Checkout
          </button>
        : <button type="submit" className="button" onClick={this.routeToLogin.bind(this)}>
          Login to Proceed
          </button>
        }
      </div>
      )
    }
    else{
      return(
        <div className="containerCheckout">
        <Header/>
        <h1>Pickup Your Meal</h1>
        <div className="form">
          <div className="fields fields--3">
            <label className="field">
              <span className="field__label" htmlFor="firstname">First name</span>
              <input className="field__input" type="text" id="firstname" value={this.state.firstName} onChange={this.onChangeFirstName}/>
            </label>
            <label className="field">
              <span className="field__label" htmlFor="lastname">Last name</span>
              <input className="field__input" type="text" id="lastname" value={this.state.lastName} onChange={this.onChangeLastName}/>
            </label>
            <label className="field">
              <span className="field__label" htmlFor="mobile">Mobile Number</span>
              <input className="field__input" type="tel" id="mobile" value={this.state.mobile} placeholder="123-456-7890" pattern="[1-9]{3}-[0-9]{3}-[0-9]{3}" onChange={this.onChangeMobile} required/>
            </label>
          </div>
        </div>
        <hr/>
        {isLoggedIn
        ? <button type="submit" className="button" onClick={this.submitCheckoutDetails.bind(this)}>
          Checkout
          </button>
        : <button type="submit" className="button" onClick={this.routeToLogin.bind(this)}>
          Login to Proceed
          </button>
        }
      </div>
      )
    }
    }
  }

class Delivery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      mobile: "",
      address: "",
      zipcode: "",
      city: "",
      stateVal: ""
    };
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeZipcode = this.onChangeZipcode.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeStateVal = this.onChangeStateVal.bind(this);
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

  onChangeMobile(e){
    const target = e.target;
    const value = target.value;
    // const name = target.name; 
    this.setState({
      mobile: value,
    })
  }

  onChangeAddress(e){
    const target = e.target;
    const value = target.value;
    // const name = target.name; 
    this.setState({
      address: value,
    })
  }

  onChangeZipcode(e){
    const target = e.target;
    const value = target.value;
    // const name = target.name; 
    this.setState({
      zipcode: value,
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

  onChangeStateVal(e){
    const target = e.target;
    const value = target.value;
    // const name = target.name; 
    this.setState({
      stateVal: value,
    })
  }

  async submitCheckoutDetails(e) {
    e.preventDefault();
    const orderDetails = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      mobile: this.state.mobile,
      address: this.state.address,
      zipcode: this.state.zipcode,
      city: this.state.city,
      stateVal: this.state.stateVal
    }

    if (orderDetails.firstName.length < 1 || orderDetails.firstName.trim() === ""){
      await showNotification ("error", "Invalid Firstname")
    }
    else if (orderDetails.lastName.length < 1 || orderDetails.lastName.trim() === ""){
      await showNotification ("error", "Invalid Lastname")
    }
    else if (orderDetails.mobile.length < 1 || orderDetails.mobile.trim() === "" || orderDetails.mobile.length !== 10){
      await showNotification ("error", "Invalid Mobile Number")
    }
    else if (orderDetails.address.length < 1 || orderDetails.address.trim() === ""){
      await showNotification ("error", "Invalid Address")
    }
    else if (orderDetails.zipcode.length < 1 || orderDetails.zipcode.trim() === "" || orderDetails.zipcode.length !== 5){
      await showNotification ("error", "Invalid Zipcode")
    }
    else if (orderDetails.city.length < 1 || orderDetails.city.trim() === ""){
      await showNotification ("error", "Invalid City")
    }
    else{
      var userId = JSON.parse(window.sessionStorage.getItem("userDetails"))["_id"];
      const currentResID = window.sessionStorage.getItem('resID');
      const currentCartTotal = window.sessionStorage.getItem('cartTotal');
      const currentCartItems = window.sessionStorage.getItem('cartItems');

      var datetime = Date().toLocaleString();

      const orderPostBody = {
        restaurantId: currentResID,
        userId: userId,
        payment: currentCartTotal,
        typeOfOrder: "Delivery",
        timeOfOrder: datetime,
        orderStatus: "atRestaurant",
        orderItems : JSON.parse(currentCartItems)
      }
      await axios.post(prod_api + '/order/placeOrder', orderPostBody)
      .then(function (response) {
        console.log(response.data);
      })
      this.routeToOrderHistory();
    }

    this.setState({
      firstName: "",
      LastName: "",
      mobile: "",
      address: "",
      zipcode: "",
      city: "",
      stateVal: ""
    })
  }
  
  async routeToOrderHistory(){
    await showNotification ("success", "Successfully Placed Order!")
    setTimeout(() => {
      window.location = "/profile"
    }, 1500)
  }

  routeToLogin(e){
    e.preventDefault()
    window.location = "/user"
  }

  render(){
    var isLoggedIn = JSON.parse(window.sessionStorage.getItem("isLoggedIn"));
    let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
    mode = mode.split('=')[1]
    if(mode==='light')
      {
      return(
        <div className="containerCheckout">
        <Header/>
        <h1 style ={{backgroundColor:"#000000"}}>Checkout Your Meal</h1>
        <div className="form" style ={{backgroundColor:"#000000"}}>
          <div className="fields fields--3">
            <label className="field">
              <span className="field__label" htmlFor="firstname">First name</span>
              <input className="field__input" type="text" id="firstname" value={this.state.firstName} onChange={this.onChangeFirstName}/>
            </label>
            <label className="field">
              <span className="field__label" htmlFor="lastname">Last name</span>
              <input className="field__input" type="text" id="lastname" value={this.state.lastName} onChange={this.onChangeLastName}/>
            </label>
            <label className="field">
              <span className="field__label" htmlFor="mobile">Mobile Number</span>
              <input className="field__input" type="tel" id="mobile" value={this.state.mobile} placeholder="123-456-7890" pattern="[1-9]{3}-[0-9]{3}-[0-9]{3}" onChange={this.onChangeMobile} required/>
            </label>
          </div>
          <label className="field">
            <span className="field__label" htmlFor="address">Address</span>
            <input className="field__input" type="text" id="address"  value={this.state.address} onChange={this.onChangeAddress} />
          </label>
          <div className="fields fields--3">
            <label className="field">
              <span className="field__label" htmlFor="zipcode">Zip code</span>
              <input className="field__input" type="text" id="zipcode" value={this.state.zipcode} onChange={this.onChangeZipcode}/>
            </label>
            <label className="field">
              <span className="field__label" htmlFor="city">City</span>
              <input className="field__input" type="text" id="city" value={this.state.city} onChange={this.onChangeCity} />
            </label>
            <label className="field">
              <span className="field__label" htmlFor="state">State</span>
              <select className="field__input" id="state" value={this.state.stateVal} onChange={this.onChangeStateVal}>
                <option value=""></option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </label>
          </div>
        </div>
        <hr/>
        {isLoggedIn
        ? <button type="submit" className="button" onClick={this.submitCheckoutDetails.bind(this)}>
          Checkout
          </button>
        : <button type="submit" className="button" onClick={this.routeToLogin.bind(this)}>
          Login to Proceed
          </button>
        }
      </div>
      )
    }
    else{
      return(
        <div className="containerCheckout">
        <Header/>
        <h1>Checkout Your Meal</h1>
        <div className="form">
          <div className="fields fields--3">
            <label className="field">
              <span className="field__label" htmlFor="firstname">First name</span>
              <input className="field__input" type="text" id="firstname" value={this.state.firstName} onChange={this.onChangeFirstName}/>
            </label>
            <label className="field">
              <span className="field__label" htmlFor="lastname">Last name</span>
              <input className="field__input" type="text" id="lastname" value={this.state.lastName} onChange={this.onChangeLastName}/>
            </label>
            <label className="field">
              <span className="field__label" htmlFor="mobile">Mobile Number</span>
              <input className="field__input" type="tel" id="mobile" value={this.state.mobile} placeholder="123-456-7890" pattern="[1-9]{3}-[0-9]{3}-[0-9]{3}" onChange={this.onChangeMobile} required/>
            </label>
          </div>
          <label className="field">
            <span className="field__label" htmlFor="address">Address</span>
            <input className="field__input" type="text" id="address"  value={this.state.address} onChange={this.onChangeAddress} />
          </label>
          <div className="fields fields--3">
            <label className="field">
              <span className="field__label" htmlFor="zipcode">Zip code</span>
              <input className="field__input" type="text" id="zipcode" value={this.state.zipcode} onChange={this.onChangeZipcode}/>
            </label>
            <label className="field">
              <span className="field__label" htmlFor="city">City</span>
              <input className="field__input" type="text" id="city" value={this.state.city} onChange={this.onChangeCity} />
            </label>
            <label className="field">
              <span className="field__label" htmlFor="state">State</span>
              <select className="field__input" id="state" value={this.state.stateVal} onChange={this.onChangeStateVal}>
                <option value=""></option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </label>
          </div>
        </div>
        <hr/>
        {isLoggedIn
        ? <button type="submit" className="button" onClick={this.submitCheckoutDetails.bind(this)}>
          Checkout
          </button>
        : <button type="submit" className="button" onClick={this.routeToLogin.bind(this)}>
          Login to Proceed
          </button>
        }
      </div>
      )
    }
}
}