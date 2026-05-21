import './restaurant-all.component.css';
import axios from 'axios';
import React, { Component } from 'react';
import { FaMapMarkedAlt, FaSearch, FaThLarge } from 'react-icons/fa';
import MapContainer from '../Static/GoogleMapsPickup';
import apiBaseUrl from '../config/api';

const dev_api = apiBaseUrl;

export default class RestaurantsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: 'list',
      activeCategory: 'All',
      searchTerm: '',
      restaurantList: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.restauranListsApiCall();
  }

  restauranListsApiCall() {
    axios.get(dev_api + '/restaurant/all')
      .then((response) => {
        this.setState({
          restaurantList: response.data || [],
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }

  setView(activeView) {
    this.setState({ activeView });
  }

  setCategory(activeCategory) {
    this.setState({ activeCategory });
  }

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  getFilteredRestaurants() {
    const { activeCategory, restaurantList, searchTerm } = this.state;
    const query = searchTerm.trim().toLowerCase();

    return restaurantList.filter((restaurant) => {
      const matchesCategory = activeCategory === 'All' || restaurant.category === activeCategory;
      const matchesSearch = !query ||
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.category.toLowerCase().includes(query) ||
        restaurant.city.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }

  render() {
    const { activeCategory, activeView, isLoading, restaurantList, searchTerm } = this.state;
    const categories = ['All'].concat(
      Array.from(new Set(restaurantList.map((restaurant) => restaurant.category))).sort()
    );
    const filteredRestaurants = this.getFilteredRestaurants();

    return (
      <main className="restaurants-page">
        <section className="restaurants-shell">
          <div className="restaurants-hero">
            <div>
              <span className="restaurants-kicker">restaurant index</span>
              <h1>Pick the next craving.</h1>
            </div>
            <p>
              Search the local board, filter by cuisine, then jump into menus or pickup mode.
            </p>
          </div>

          <div className="restaurants-console">
            <div className="restaurants-search">
              <label htmlFor="restaurant-search">scan restaurants</label>
              <div className="restaurants-search__control">
                <FaSearch />
                <input
                  id="restaurant-search"
                  type="search"
                  placeholder="pizza, indian, hoboken..."
                  value={searchTerm}
                  onChange={this.onSearchChange}
                />
              </div>
            </div>

            <div className="restaurants-view-toggle" aria-label="Restaurant view">
              <button
                className={activeView === 'list' ? 'is-active' : ''}
                type="button"
                onClick={() => this.setView('list')}
              >
                <FaThLarge />
                list
              </button>
              <button
                className={activeView === 'pickup' ? 'is-active' : ''}
                type="button"
                onClick={() => this.setView('pickup')}
              >
                <FaMapMarkedAlt />
                pickup
              </button>
            </div>
          </div>

          <div className="restaurants-category-strip" aria-label="Cuisine filters">
            {categories.map((category) => (
              <button
                className={activeCategory === category ? 'is-active' : ''}
                key={category}
                type="button"
                onClick={() => this.setCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {activeView === 'list' ? (
            <RestaurantsGrid restaurants={filteredRestaurants} isLoading={isLoading} />
          ) : (
            <div className="restaurants-map-panel">
              <MapContainer zoomLevel={17} />
            </div>
          )}
        </section>
      </main>
    );
  }
}

class RestaurantsGrid extends React.Component {
  handleClick = (restaurant) => () => {
    window.sessionStorage.setItem('resID', restaurant._id);
    window.location.href = '/res/' + restaurant._id;
  }

  render() {
    const { isLoading, restaurants } = this.props;

    if (isLoading) {
      return <div className="restaurants-empty">loading local spots...</div>;
    }

    if (!restaurants.length) {
      return <div className="restaurants-empty">no restaurants match this scan.</div>;
    }

    return (
      <section className="restaurants-grid" aria-label="Restaurant list">
        {restaurants.map((restaurant, index) => (
          <article
            className="restaurant-card"
            key={restaurant._id}
            onClick={this.handleClick(restaurant)}
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
}
