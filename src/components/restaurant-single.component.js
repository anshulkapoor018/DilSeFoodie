import React from 'react';
import axios from 'axios';
import './restaurant-single.component.css';
import MapSection from '../Static/GoogleMaps';

var dummyProfilePics = "https://res.cloudinary.com/helpinghands101/image/upload/v1615598217/user_mcyfxd.png"

export default class RestaurantsPage extends React.Component {
  constructor(props) {
    super(props);
    this.resID = ((window.location.pathname).split("/"))[2]
    this.state = {
      restaurantDetails: {},
      reviewsMap: []
    };
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.openLoginForm = this.openLoginForm.bind(this);
    this.closeLoginForm = this.closeLoginForm.bind(this);
    this.routeToLogin = this.routeToLogin.bind(this);
  }

  componentDidMount() {
    this.restauranListApiCall();
    this.reviewListApiCall();
  }

  openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  restauranListApiCall() {
    var self = this;
    axios.get('http://localhost:5000/restaurant/'+self.resID)
    .then(function (response) {
      self.setState({ restaurantDetails: response.data });
    })
  }

  reviewListApiCall() {
    var self = this;
    axios.get('http://localhost:5000/review/restaurant/'+self.resID)
    .then(function (response) {
      self.setState({ reviewsMap: response.data });
    })
  }

  openForm(e) {
    e.preventDefault();
    document.getElementById("myForm").style.display = "block";
  }

  closeForm(e) {
    e.preventDefault();
    document.getElementById("myForm").style.display = "none";
  }

  openLoginForm(e) {
    e.preventDefault();
    document.getElementById("myLoginForm").style.display = "block";
  }

  closeLoginForm(e) {
    e.preventDefault();
    document.getElementById("myLoginForm").style.display = "none";
  }

  routeToLogin(e){
    e.preventDefault()
    window.location = "/user"
  }
  
  render(){
    var isLoggedIn = JSON.parse(window.sessionStorage.getItem("isLoggedIn"));
    const restaurant = this.state.restaurantDetails;
    const location = [{
      address: restaurant.name,
      lat: restaurant.latitude,
      lng: restaurant.longitude,
    }]
    const divStyle = {
      height: '800px',
    };
    return(
      <div className='homepage'>
        <div style ={divStyle} className="card-wide" id ="left">
          <h1>{restaurant.name}</h1>
          <p className = "category">{restaurant.category}</p>
          <p>{restaurant.address}</p>
          <p>{restaurant.city}, {restaurant.state} {restaurant.zip}</p>
          <br></br>
          <MapSection location={location} zoomLevel={17} />
        </div>
        <div className="card-wide" id="right">
          <h2>Reviews</h2>
          {this.state.reviewsMap.map((item, index) => (
            <div key = {index} className = "reviews">
              <div className = "card-full">
                <div className="reviewHeading">
                  <div className="reviewerName">
                    <div className="reviewerIcon">
                      <img src={dummyProfilePics} alt="Profile" className="profileIcon"/>
                    </div>
                    <h3 className = "p_inline">User Name</h3>
                  </div>
                  <div className="reviewerRating">
                    <h3 className = "rating">Rating: {item.rating}</h3>
                  </div>
                </div>
                <p>{item.reviewText}</p>
              </div>
            </div>
          ))}
        </div>
        {isLoggedIn
          ? <button className="open-button" onClick={this.openForm.bind(this)}>Post a Review</button>
          : <button className="open-button" onClick={this.openLoginForm.bind(this)}>Post a Review</button>
        }
        <div className="form-popup" id="myForm">
          <h2>Post a Review</h2>
            <form id="login-form" name ="loginForm" className="form-container" enctype="multipart/form-data">
                <label>
                    <input type="text" name="rating" id="rating" class = "inputFields" pattern="\d+" placeholder="Enter your Rating" required title="Enter a Number from 1 to 5"/> 
                </label>
                <label>
                    <input type="text" name="reviewText" id="reviewText" class = "inputFields" placeholder="Enter your Review" required/>
                </label>
                <button type="submit" className="btn">Post!</button>
                <button type="button" className="btn cancel" onClick={this.closeForm.bind(this)}>Cancel</button>
            </form>
        </div>
        <div className="form-popup" id="myLoginForm">
          <h2>Login to post a review!</h2>
          <form id="login-form" name ="loginForm" className="form-container">
            <button type="submit" className="btn" id="routeToLogin" onClick={this.routeToLogin.bind(this)}>Login</button>
            <button type="button" className="btn cancel" onClick={this.closeLoginForm.bind(this)}>Cancel</button>
          </form>
        </div>
      </div>
    )
  }
}