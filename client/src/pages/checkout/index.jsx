import React, { Component } from 'react';
import Cart from '../../cart';
import Header from '../../layout/header';
import './styles.css';

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

  componentDidMount() {
    // this.restauranListsApiCall();
  }

  // restauranListsApiCall() {
  //   var self = this;
  //   let markers = []
  //   axios.get(prod_api + '/restaurant/all')
  //   .then(function (response) {
  //     response.data.forEach(rest => 
  //       markers.push({
  //         'name': rest.name,
  //         'latitude': rest.latitude,
  //         'longitude': rest.longitude
  //       })
  //     );
  //     self.setState({ restaurantListView: markers });
  //   })
  // }

  render() {
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

class Pickup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantList: []
    };
  }

  // componentDidMount() {
  //   this.restauranListApiCall();
  // }

  // restauranListApiCall() {
  //   var self = this;
  //   axios.get(prod_api + '/restaurant/all')
  //   .then(function (response) {
  //     self.setState({ restaurantList: response.data });
  //   })
  // }

  // handleClick = param => e => {
  //   window.location = '/res/' + param._id
  // }

  render(){
    return(
      <div className="containerCheckout">
      <Header/>
      <h1>Pickup Your Meal</h1>
      <div className="form">
        <div className="fields fields--2">
          <label className="field">
            <span className="field__label" for="firstname">First name</span>
            <input className="field__input" type="text" id="firstname"/>
          </label>
          <label className="field">
            <span className="field__label" for="lastname">Last name</span>
            <input className="field__input" type="text" id="lastname"/>
          </label>
        </div>
      </div>
      <hr/>
      <button className="button">Checkout</button>
    </div>
    )
  }
}

class Delivery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantList: []
    };
  }

  // componentDidMount() {
  //   this.restauranListApiCall();
  // }

  // restauranListApiCall() {
  //   var self = this;
  //   axios.get(prod_api + '/restaurant/all')
  //   .then(function (response) {
  //     self.setState({ restaurantList: response.data });
  //   })
  // }

  // handleClick = param => e => {
  //   window.location = '/res/' + param._id
  // }

  render(){
    return(
      <div className="containerCheckout">
      <Header/>
      <h1>Checkout Your Meal</h1>
      <div className="form">
        <div className="fields fields--2">
          <label className="field">
            <span className="field__label" for="firstname">First name</span>
            <input className="field__input" type="text" id="firstname"/>
          </label>
          <label className="field">
            <span className="field__label" for="lastname">Last name</span>
            <input className="field__input" type="text" id="lastname"/>
          </label>
        </div>
        <label className="field">
          <span className="field__label" for="address">Address</span>
          <input className="field__input" type="text" id="address" />
        </label>
        <div className="fields fields--3">
          <label className="field">
            <span className="field__label" for="zipcode">Zip code</span>
            <input className="field__input" type="text" id="zipcode" />
          </label>
          <label className="field">
            <span className="field__label" for="city">City</span>
            <input className="field__input" type="text" id="city" />
          </label>
          <label className="field">
            <span className="field__label" for="state">State</span>
            <select className="field__input" id="state">
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
      <button className="button">Checkout</button>
    </div>
    )
  }
}
// export default function CheckoutPage() {
//   return (
//     <div className="containerCheckout">
//       <Header/>
//       <h1>Checkout Meal</h1>
//       <div className="form">
//         <div className="fields fields--2">
//           <label className="field">
//             <span className="field__label" for="firstname">First name</span>
//             <input className="field__input" type="text" id="firstname"/>
//           </label>
//           <label className="field">
//             <span className="field__label" for="lastname">Last name</span>
//             <input className="field__input" type="text" id="lastname"/>
//           </label>
//         </div>
//         <label className="field">
//           <span className="field__label" for="address">Address</span>
//           <input className="field__input" type="text" id="address" />
//         </label>
//         <label className="field">
//           <span className="field__label" for="country">Country</span>
//           <select className="field__input" id="country">
//             <option value=""></option>
//             <option value="unitedstates">United States</option>
//           </select>
//         </label>
//         <div className="fields fields--3">
//           <label className="field">
//             <span className="field__label" for="zipcode">Zip code</span>
//             <input className="field__input" type="text" id="zipcode" />
//           </label>
//           <label className="field">
//             <span className="field__label" for="city">City</span>
//             <input className="field__input" type="text" id="city" />
//           </label>
//           <label className="field">
//             <span className="field__label" for="state">State</span>
//             <select className="field__input" id="state">
//               <option value=""></option>
//               <option value="AL">Alabama</option>
//               <option value="AK">Alaska</option>
//               <option value="AZ">Arizona</option>
//               <option value="AR">Arkansas</option>
//               <option value="CA">California</option>
//               <option value="CO">Colorado</option>
//               <option value="CT">Connecticut</option>
//               <option value="DE">Delaware</option>
//               <option value="DC">District Of Columbia</option>
//               <option value="FL">Florida</option>
//               <option value="GA">Georgia</option>
//               <option value="HI">Hawaii</option>
//               <option value="ID">Idaho</option>
//               <option value="IL">Illinois</option>
//               <option value="IN">Indiana</option>
//               <option value="IA">Iowa</option>
//               <option value="KS">Kansas</option>
//               <option value="KY">Kentucky</option>
//               <option value="LA">Louisiana</option>
//               <option value="ME">Maine</option>
//               <option value="MD">Maryland</option>
//               <option value="MA">Massachusetts</option>
//               <option value="MI">Michigan</option>
//               <option value="MN">Minnesota</option>
//               <option value="MS">Mississippi</option>
//               <option value="MO">Missouri</option>
//               <option value="MT">Montana</option>
//               <option value="NE">Nebraska</option>
//               <option value="NV">Nevada</option>
//               <option value="NH">New Hampshire</option>
//               <option value="NJ">New Jersey</option>
//               <option value="NM">New Mexico</option>
//               <option value="NY">New York</option>
//               <option value="NC">North Carolina</option>
//               <option value="ND">North Dakota</option>
//               <option value="OH">Ohio</option>
//               <option value="OK">Oklahoma</option>
//               <option value="OR">Oregon</option>
//               <option value="PA">Pennsylvania</option>
//               <option value="RI">Rhode Island</option>
//               <option value="SC">South Carolina</option>
//               <option value="SD">South Dakota</option>
//               <option value="TN">Tennessee</option>
//               <option value="TX">Texas</option>
//               <option value="UT">Utah</option>
//               <option value="VT">Vermont</option>
//               <option value="VA">Virginia</option>
//               <option value="WA">Washington</option>
//               <option value="WV">West Virginia</option>
//               <option value="WI">Wisconsin</option>
//               <option value="WY">Wyoming</option>
//             </select>
//           </label>
//         </div>
//       </div>
//       <hr/>
//       <button className="button">Checkout</button>
//     </div>
//   );
// }
