import React from 'react';
import axios from 'axios';
import './restaurant-single.component.css';
import MapSection from '../Static/GoogleMaps';
import StarRatings from 'react-star-ratings';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaMapMarkerAlt, FaReceipt, FaRegCommentDots, FaStar } from 'react-icons/fa';
import apiBaseUrl from '../config/api';

const dev_api = apiBaseUrl;
const dummyProfilePics = 'https://res.cloudinary.com/helpinghands101/image/upload/v1615598217/user_mcyfxd.png';

async function showNotification(type, message) {
  const timer = 2000;
  if (type === 'error') {
    NotificationManager.error(message, '', timer);
  } else if (type === 'success') {
    NotificationManager.success(message, '', timer);
  } else if (type === 'warning') {
    NotificationManager.warning(message, '', timer);
  }
}

export default class RestaurantsPage extends React.Component {
  constructor(props) {
    super(props);
    this.resID = ((window.location.pathname).split('/'))[2];
    this.state = {
      restaurantDetails: {},
      reviewsMap: [],
      rating: 0,
      reviewString: '',
      isReviewOpen: false,
      isLoginOpen: false,
    };
    this.changeRating = this.changeRating.bind(this);
    this.submitRatingForm = this.submitRatingForm.bind(this);
    this.onChangeReview = this.onChangeReview.bind(this);
  }

  componentDidMount() {
    this.restauranListApiCall();
    this.reviewListApiCall();
  }

  restauranListApiCall() {
    axios.get(dev_api + '/restaurant/' + this.resID)
      .then((response) => {
        this.setState({ restaurantDetails: response.data || {} });
      })
      .catch((error) => console.log(error));
  }

  reviewListApiCall() {
    axios.get(dev_api + '/review/restaurant/' + this.resID)
      .then((response) => {
        this.setState({ reviewsMap: response.data || [] });
      })
      .catch((error) => console.log(error));
  }

  openReview = (e) => {
    e.preventDefault();
    const isLoggedIn = JSON.parse(window.sessionStorage.getItem('isLoggedIn'));
    this.setState({
      isReviewOpen: Boolean(isLoggedIn),
      isLoginOpen: !isLoggedIn,
    });
  }

  closePanels = (e) => {
    if (e) e.preventDefault();
    this.setState({
      isReviewOpen: false,
      isLoginOpen: false,
    });
  }

  routeToLogin = (e) => {
    e.preventDefault();
    window.location = '/user';
  }

  changeRating(newRating) {
    this.setState({
      rating: newRating,
    });
  }

  async submitRatingForm(e) {
    e.preventDefault();
    const userObject = JSON.parse(window.sessionStorage.getItem('userDetails'));

    if (!userObject) {
      this.setState({ isReviewOpen: false, isLoginOpen: true });
      return;
    }

    if (this.state.reviewString.trim().length < 3) {
      await showNotification('error', 'Please enter a valid review.');
      return;
    }

    const reviewBody = {
      restaurantId: this.resID,
      userId: userObject._id,
      reviewText: this.state.reviewString,
      rating: this.state.rating,
    };

    await axios.post(dev_api + '/review/add', reviewBody);
    window.location.reload();
  }

  onChangeReview(e) {
    this.setState({
      reviewString: e.target.value,
    });
  }

  renderReviews() {
    if (!this.state.reviewsMap.length) {
      return (
        <div className="detail-empty-review">
          <FaRegCommentDots />
          <p>No reviews yet. Be the first to leave a signal.</p>
        </div>
      );
    }

    return this.state.reviewsMap.map((item, index) => (
      <article key={index} className="detail-review">
        <div className="detail-review__person">
          <img
            src={item.userDetails.profile || dummyProfilePics}
            alt={item.userDetails.name}
          />
          <div>
            <strong>{item.userDetails.name}</strong>
            <span>Rating {item.rating}/5</span>
          </div>
        </div>
        <p>{item.reviewText}</p>
      </article>
    ));
  }

  render() {
    const restaurant = this.state.restaurantDetails;
    const hasLocation = restaurant.latitude && restaurant.longitude;
    const location = [{
      address: restaurant.name,
      name: restaurant.name,
      lat: restaurant.latitude,
      lng: restaurant.longitude,
    }];
    const reviewAverage = this.state.reviewsMap.length
      ? (this.state.reviewsMap.reduce((total, item) => total + Number(item.rating || 0), 0) / this.state.reviewsMap.length).toFixed(1)
      : 'new';

    return (
      <main className="restaurant-detail-page">
        <section className="restaurant-detail-shell">
          <div className="detail-hero">
            <div className="detail-hero__copy">
              <span className="detail-kicker">{restaurant.category || 'restaurant'}</span>
              <h1>{restaurant.name || 'Loading restaurant...'}</h1>
              <p>
                {restaurant.address && (
                  <>
                    <FaMapMarkerAlt /> {restaurant.address}, {restaurant.city}, {restaurant.state} {restaurant.zip}
                  </>
                )}
              </p>
              <div className="detail-actions">
                <Link to={'/orderItems/' + this.resID} className="detail-action detail-action--primary">
                  <FaReceipt />
                  order now
                </Link>
                {restaurant.website && (
                  <button className="detail-action" type="button" onClick={() => window.open(/^https?:\/\//.test(restaurant.website) ? restaurant.website : 'https://' + restaurant.website, '_blank', 'noopener,noreferrer')}>
                    <FaExternalLinkAlt />
                    website
                  </button>
                )}
              </div>
            </div>

            <div className="detail-hero__image">
              {restaurant.thumbnail && <img src={restaurant.thumbnail} alt={restaurant.name} />}
              <div className="detail-rating">
                <FaStar />
                <strong>{reviewAverage}</strong>
                <span>{this.state.reviewsMap.length} reviews</span>
              </div>
            </div>
          </div>

          <section className="detail-grid">
            <div className="detail-panel detail-panel--map">
              <div className="detail-panel__header">
                <span>pickup map</span>
                <strong>{restaurant.city || 'local'}</strong>
              </div>
              {hasLocation && <MapSection location={location} zoomLevel={15} />}
            </div>

            <aside className="detail-panel detail-panel--reviews">
              <div className="detail-panel__header">
                <span>review board</span>
                <button type="button" onClick={this.openReview}>post review</button>
              </div>
              <div className="detail-reviews-list">
                {this.renderReviews()}
              </div>
            </aside>
          </section>
        </section>

        {this.state.isReviewOpen && (
          <div className="detail-modal" role="dialog" aria-modal="true">
            <form className="detail-modal__panel" onSubmit={this.submitRatingForm}>
              <h2>Post a review</h2>
              <input
                type="text"
                name="reviewText"
                id="reviewText"
                placeholder="What should people know?"
                value={this.state.reviewString}
                onChange={this.onChangeReview}
                required
              />
              <StarRatings
                rating={this.state.rating}
                starRatedColor="#ff6b35"
                changeRating={this.changeRating}
                numberOfStars={5}
                name="rating"
                starHoverColor="#ffd84d"
                starDimension="34px"
              />
              <div className="detail-modal__actions">
                <button type="submit">post</button>
                <button type="button" onClick={this.closePanels}>cancel</button>
              </div>
            </form>
          </div>
        )}

        {this.state.isLoginOpen && (
          <div className="detail-modal" role="dialog" aria-modal="true">
            <form className="detail-modal__panel" onSubmit={this.routeToLogin}>
              <h2>Login to post a review</h2>
              <p>Your review board needs a profile before posting.</p>
              <div className="detail-modal__actions">
                <button type="submit">login</button>
                <button type="button" onClick={this.closePanels}>cancel</button>
              </div>
            </form>
          </div>
        )}
      </main>
    );
  }
}
