import './restaurant-all.component.css';
import axios from 'axios';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import apiBaseUrl from '../config/api';

const getSearchTerm = () => decodeURI(window.location.pathname.split('/')[2] || '').trim();

export default class RestaurantSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      restaurantList: [],
      searchTerm: getSearchTerm()
    };
  }

  componentDidMount() {
    this.restaurantSearchApiCall();
  }

  componentDidUpdate() {
    const nextSearchTerm = getSearchTerm();

    if (nextSearchTerm !== this.state.searchTerm) {
      this.setState({ isLoading: true, searchTerm: nextSearchTerm }, () => {
        this.restaurantSearchApiCall();
      });
    }
  }

  restaurantSearchApiCall() {
    const { searchTerm } = this.state;

    if (!searchTerm) {
      this.setState({ isLoading: false, restaurantList: [] });
      return;
    }

    axios
      .post(`${apiBaseUrl}/restaurant/search`, { SearchString: searchTerm })
      .then((response) => {
        this.setState({
          isLoading: false,
          restaurantList: response.data.restDetails || []
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false, restaurantList: [] });
      });
  }

  openRestaurant = (restaurant) => () => {
    window.sessionStorage.setItem('resID', restaurant._id);
    window.location.href = '/res/' + restaurant._id;
  }

  renderResults() {
    const { isLoading, restaurantList, searchTerm } = this.state;

    if (isLoading) {
      return <div className="restaurants-empty">loading search results...</div>;
    }

    if (!restaurantList.length) {
      return <div className="restaurants-empty">no restaurants match {searchTerm}.</div>;
    }

    return (
      <section className="restaurants-grid" aria-label="Search results">
        {restaurantList.map((restaurant, index) => (
          <article
            className="restaurant-card"
            key={restaurant._id}
            onClick={this.openRestaurant(restaurant)}
            tabIndex="0"
            role="button"
          >
            <div className="restaurant-card__image">
              <img src={restaurant.thumbnail} alt={restaurant.name} />
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="restaurant-card__body">
              <div className="restaurant-card__meta">
                <span>{restaurant.category}</span>
                <span>{restaurant.city}</span>
              </div>
              <h2>{restaurant.name}</h2>
              <p>{restaurant.address}, {restaurant.city}, {restaurant.state}</p>
              <button type="button">open menu</button>
            </div>
          </article>
        ))}
      </section>
    );
  }

  render() {
    const { restaurantList, searchTerm } = this.state;

    return (
      <main className="restaurants-page">
        <section className="restaurants-shell">
          <div className="restaurants-hero">
            <div>
              <span className="restaurants-kicker">search results</span>
              <h1>{searchTerm || 'Search'}</h1>
            </div>
            <p>
              {restaurantList.length
                ? `${restaurantList.length} local match${restaurantList.length === 1 ? '' : 'es'} found.`
                : 'Scanning restaurants by name and cuisine.'}
            </p>
          </div>

          <div className="restaurants-console">
            <div className="restaurants-search">
              <label htmlFor="restaurant-search-result">active query</label>
              <div className="restaurants-search__control">
                <FaSearch />
                <input
                  id="restaurant-search-result"
                  type="search"
                  value={searchTerm}
                  readOnly
                />
              </div>
            </div>
          </div>

          {this.renderResults()}
        </section>
      </main>
    );
  }
}
