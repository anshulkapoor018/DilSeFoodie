import React from 'react';
import axios from 'axios';
import './restaurant-single.component.css';
import MapSection from '../Static/GoogleMaps';
import StarRatings from 'react-star-ratings';
import {NotificationManager} from 'react-notifications';
import { Link } from 'react-router-dom';


const prod_api = 'https://dilsefoodie.herokuapp.com';
const dev_api = "http://localhost:5000";

var dummyProfilePics = "https://res.cloudinary.com/helpinghands101/image/upload/v1615598217/user_mcyfxd.png"
var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));

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

export default class RestaurantsPage extends React.Component {
  constructor(props) {
    super(props);
    this.resID = ((window.location.pathname).split("/"))[2]
    this.state = {
      restaurantDetails: {},
      reviewsMap: [],
      rating: 0,
      reviewString: "",
    };
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.openLoginForm = this.openLoginForm.bind(this);
    this.closeLoginForm = this.closeLoginForm.bind(this);
    this.routeToLogin = this.routeToLogin.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.submitRatingForm = this.submitRatingForm.bind(this);
    this.onChangeReview = this.onChangeReview.bind(this);
    this.orderNow = this.orderNow.bind(this);
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
    axios.get(prod_api + '/restaurant/'+self.resID)
    .then(function (response) {
      self.setState({ restaurantDetails: response.data });
    })
  }

  reviewListApiCall() {
    var self = this;
    axios.get(prod_api + '/review/restaurant/' + self.resID)
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

  changeRating( newRating ) {
    this.setState({
      rating: newRating
    });
  }

  async submitRatingForm(e) {
    e.preventDefault();
    var self = this;
    if (self.state.reviewString.length < 3){
      await showNotification ("error", "Please Enter a Valid Review");
    } else {
      const reviewBody = {
        restaurantId: self.resID,
        userId: userObject["_id"],
        reviewText: this.state.reviewString,
        rating: self.state.rating
      }
      const response = await axios.post(prod_api + '/review/add', reviewBody);
      console.log(response.data);
      window.location.reload();
    }
  }

  onChangeReview(e){
    const target = e.target;
    const value = target.value;
    this.setState({
      reviewString: value
    })
  }

  orderNow(e){
    e.preventDefault();
    var self = this;
    console.log("Order Food Now!");
    window.sessionStorage.setItem('resID', self.resID);
    // window.location = "/orderItems/" + self.resID;
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
    let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
    mode = mode.split('=')[1]
    if(mode==='light')
    {
    return(
      <div className='homepage'>
        <div style ={divStyle} className="card-wide" style = {{backgroundColor:"#000"}} id ="left">
          <div id="inline"> 
            <div className="one">
              <h5 style = {{color:"#ffffff"}}>{restaurant.name}</h5>
              <p className = "category" style = {{color:"#b4fffb"}}>{restaurant.category}</p>
              <p style = {{color:"#b4fffb"}}>{restaurant.address}</p>
              <p style = {{color:"#b4fffb"}}>{restaurant.city}, {restaurant.state} {restaurant.zip}</p>
              <Link to={'/orderItems/'+this.resID}>
                <div id="buttonplace"><input type="button" value="Order Now" className="fancybutton" />
                </div>
              </Link>
            </div> 
            <div className="two">
              <div className="imgRes"><img className = "imgThumb" style = {{filter: "drop-shadow(5px 5px 5px #ffffff)"}} src={restaurant.thumbnail} alt={restaurant.name}/></div>
            </div> 
          </div> 
          <br></br>
          <MapSection location={location} zoomLevel={17} />
        </div>
        <div className="card-wide"  style = {{backgroundColor:"#000000"}} id="right">
          <h2 style = {{backgroundColor:"#000000"}}>Reviews</h2>
          {this.state.reviewsMap.map((item, index) => (
            <div key = {index} className = "reviews">
              <div className = "card-full-dark">
                <div className="reviewHeading">
                  <div className="reviewerName">
                    <div className="reviewerIcon">
                      {item.userDetails["profile"]
                        ? <img src={item.userDetails["profile"]} alt="Profile" className="profileIcon"/>
                        : <img src={dummyProfilePics} alt="Profile" className="profileIcon"/>
                      }
                    </div>
                    <h3 className = "p_inline">{item.userDetails["name"]}</h3>
                  </div>
                  <div className="reviewerRating">
                    <h3 className = "rating">Rating: {item.rating}</h3>
                  </div>
                </div>
                <p style = {{color:"#b4fffb"}} >{item.reviewText}</p>
              </div>
            </div>
          ))}
        </div>
        {isLoggedIn
          ? <button className="open-button" onClick={this.openForm.bind(this)}>Post a Review</button>
          : <button className="open-button" onClick={this.openLoginForm.bind(this)}>Post a Review</button>
        }
        <div className="form-popup-dark" id="myForm">
          <h2>Post a Review</h2>
            <form id="login-form" name ="loginForm" className="form-container">
                <label>
                    <input type="text" name="reviewText" id="reviewText" className = "inputFields" placeholder="Enter your Review" value={this.state.reviewString} onChange={this.onChangeReview} required/>
                </label>
                <StarRatings
                  rating={this.state.rating}
                  starRatedColor="red"
                  changeRating={this.changeRating.bind(this)}
                  numberOfStars={5}
                  name='rating'
                  starHoverColor="yellow"
                  starDimension= "40px"
                />
                <button type="submit" className="btn" onClick={this.submitRatingForm.bind(this)}>Post!</button>
                <button type="button" className="btn cancel" onClick={this.closeForm.bind(this)}>Cancel</button>
            </form>
        </div>
        <div className="form-popup-dark" id="myLoginForm">
          <h2>Login to post a review!</h2>
          <form id="login-form" name ="loginForm" className="form-container">
            <button type="submit" className="btn" id="routeToLogin" onClick={this.routeToLogin.bind(this)}>Login</button>
            <button type="button" className="btn cancel" onClick={this.closeLoginForm.bind(this)}>Cancel</button>
          </form>
        </div>
      </div>
    )
  }
  
  else{
    return(
      <div className='homepage'>
        <div style ={divStyle} className="card-wide" id ="left">
          <div id="inline"> 
            <div className="one">
              <h5>{restaurant.name}</h5>
              <p className = "category">{restaurant.category}</p>
              <p>{restaurant.address}</p>
              <p>{restaurant.city}, {restaurant.state} {restaurant.zip}</p>
              <Link to={'/orderItems/'+this.resID}>
                <div id="buttonplace"><input type="button" value="Order Now" className="fancybutton" />
                </div>
              </Link>
            </div> 
            <div className="two">
              <div className="imgRes"><img className = "imgThumb" src={restaurant.thumbnail} alt={restaurant.name}/></div>
            </div> 
          </div> 
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
                      {item.userDetails["profile"]
                        ? <img src={item.userDetails["profile"]} alt="Profile" className="profileIcon"/>
                        : <img src={dummyProfilePics} alt="Profile" className="profileIcon"/>
                      }
                    </div>
                    <h3 className = "p_inline">{item.userDetails["name"]}</h3>
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
            <form id="login-form" name ="loginForm" className="form-container">
                <label>
                    <input type="text" name="reviewText" id="reviewText" className = "inputFields" placeholder="Enter your Review" value={this.state.reviewString} onChange={this.onChangeReview} required/>
                </label>
                <StarRatings
                  rating={this.state.rating}
                  starRatedColor="red"
                  changeRating={this.changeRating.bind(this)}
                  numberOfStars={5}
                  name='rating'
                  starHoverColor="yellow"
                  starDimension= "40px"
                />
                <button type="submit" className="btn" onClick={this.submitRatingForm.bind(this)}>Post!</button>
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
}