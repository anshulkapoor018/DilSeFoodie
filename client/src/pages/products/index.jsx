import React from 'react';
import axios from 'axios';
import { FaChevronLeft, FaConciergeBell, FaReceipt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Product from './product';
import Header from '../../layout/header';
import apiBaseUrl from '../../config/api';

import './styles.css';

const getRestaurantIdFromPath = () => decodeURI(window.location.pathname.split('/')[2] || '');

export default class ProductsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resID: getRestaurantIdFromPath(),
      restaurant: null,
      restaurantList: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.loadMenuBoard();
  }

  loadMenuBoard() {
    const { resID } = this.state;

    axios
      .all([
        axios.get(`${apiBaseUrl}/restaurant/${resID}`),
        axios.get(`${apiBaseUrl}/menu/restaurant/${resID}`)
      ])
      .then(
        axios.spread((restaurantResponse, menuResponse) => {
          this.setState({
            restaurant: restaurantResponse.data,
            restaurantList: menuResponse.data,
            isLoading: false
          });
        })
      )
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  renderEmptyState() {
    const { restaurant } = this.state;
    const restaurantName = restaurant ? restaurant.name : '';
    const possessiveName = restaurantName.endsWith('s') ? `${restaurantName}'` : `${restaurantName}'s`;

    return (
      <section className='menu-empty'>
        <div className='menu-empty__icon'>
          <FaConciergeBell />
        </div>
        <p className='menu-kicker'>menu board</p>
        <h2>{restaurant ? `${possessiveName} menu is warming up.` : 'This menu is warming up.'}</h2>
        <p>
          No menu items are seeded for this restaurant yet. The order flow is ready, and we can plug in real dishes
          as part of the next data pass.
        </p>
        <Link className='menu-button menu-button--ghost' to='/restaurants'>
          <FaChevronLeft />
          Back to restaurants
        </Link>
      </section>
    );
  }

  renderMenuGrid() {
    const { restaurantList } = this.state;

    if (!restaurantList.length) {
      return this.renderEmptyState();
    }

    return (
      <section className='menu-grid' aria-label='Restaurant menu'>
        {restaurantList.map((product) => (
          <Product key={product._id} {...product} />
        ))}
      </section>
    );
  }

  render() {
    const { isLoading, restaurant, restaurantList } = this.state;
    const itemCount = restaurantList.length;

    return (
      <>
        <Header />
        <main className='menu-page'>
          <section className='menu-shell'>
            <div className='menu-hero'>
              <div className='menu-hero__copy'>
                <p className='menu-kicker'>order console</p>
                <h1>{restaurant ? restaurant.name : 'Menu board'}</h1>
                <p>
                  Pick your plate, tune the cart, and keep the order moving without hunting for hidden controls.
                </p>
              </div>
              <div className='menu-hero__panel'>
                <span className='menu-hero__dial'>01</span>
                <span>{restaurant ? restaurant.category : 'local kitchen'}</span>
                <strong>{isLoading ? 'syncing menu' : `${itemCount} item${itemCount === 1 ? '' : 's'}`}</strong>
              </div>
            </div>

            <div className='menu-toolbar'>
              <Link className='menu-button menu-button--ghost' to={restaurant ? `/res/${restaurant._id}` : '/restaurants'}>
                <FaChevronLeft />
                Restaurant
              </Link>
              <div className='menu-toolbar__status'>
                <FaReceipt />
                {isLoading ? 'Checking the kitchen feed' : itemCount ? 'Ready to add items' : 'Menu needs items'}
              </div>
            </div>

            {isLoading ? (
              <section className='menu-loading'>
                <span />
                <span />
                <span />
              </section>
            ) : (
              this.renderMenuGrid()
            )}
          </section>
        </main>
      </>
    );
  }
}
