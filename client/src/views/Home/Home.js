import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaMotorcycle, FaRegCommentDots, FaSearch, FaStore, FaUsers, FaUtensils } from 'react-icons/fa';
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
import apiBaseUrl from '../../config/api';
import './Home.css';

const dev_api = apiBaseUrl;

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

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      SearchString: '',
      stats: {},
    };
    this.submitSearch = this.submitSearch.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await axios.post(dev_api + '/stats/all');
      this.setState({ stats: response.data || {} });
    } catch (error) {
      console.log(error);
    }
  }

  onChangeSearch(e) {
    this.setState({
      SearchString: e.target.value,
    });
  }

  async submitSearch(e) {
    e.preventDefault();

    const search = {
      SearchString: this.state.SearchString,
    };

    if (this.state.SearchString.trim() === '') {
      await showNotification('error', 'Please enter something to search.');
      return;
    }

    try {
      const response = await axios.post(dev_api + '/restaurant/search', search);
      if (response.data.restDetails.length !== 0) {
        await showNotification('success', 'Search found.');
        setTimeout(() => {
          window.location = '/search/' + String(search.SearchString);
        }, 800);
      } else {
        await showNotification('error', 'No search results.');
      }
    } catch (err) {
      console.log(err);
      await showNotification('error', 'Search is unavailable right now.');
    }
  }

  render() {
    const { stats } = this.state;
    const statCards = [
      {
        label: 'Local diners',
        value: stats.user1 || 0,
        icon: <FaUsers />,
        tone: 'yellow',
      },
      {
        label: 'Restaurant partners',
        value: stats.Allrestr || 0,
        icon: <FaStore />,
        tone: 'blue',
      },
      {
        label: 'Orders handled',
        value: stats.orders || 0,
        icon: <FaMotorcycle />,
        tone: 'red',
      },
      {
        label: 'Community reviews',
        value: stats.rev || 0,
        icon: <FaRegCommentDots />,
        tone: 'green',
      },
    ];

    return (
      <main className="home-page">
        <section className="home-hero">
          <div className="home-hero__rail">
            <span>FOOD FINDER 01</span>
            <span>JC / HOB</span>
            <span>LIVE MENU</span>
          </div>

          <div className="home-hero__content">
            <div className="home-hero__eyebrow">
              <FaUtensils />
              Jersey City + Hoboken
            </div>
            <h1>DilSeFoodie</h1>
            <p>
              A sharper way to scan local restaurants, compare cravings, and jump into food that feels close.
            </p>

            <form className="home-search" onSubmit={this.submitSearch}>
              <label htmlFor="search-bar">search console</label>
              <div className="home-search__control">
                <FaSearch className="home-search__icon" />
                <input
                  id="search-bar"
                  type="text"
                  name="search"
                  placeholder="pizza, indian, ramen..."
                  value={this.state.SearchString}
                  onChange={this.onChangeSearch}
                />
                <button type="submit">go</button>
              </div>
            </form>

            <div className="home-actions">
              <Link to="/restaurants" className="home-actions__primary">
                browse all
              </Link>
              <Link to="/user" className="home-actions__secondary">
                sign in
              </Link>
            </div>
          </div>

          <div className="home-hero__feature">
            <div className="home-feature__screen">
              <img src="/BG4.png" alt="Table spread with restaurant dishes" />
              <span>today's plate</span>
            </div>
            <div className="home-feature__meters" aria-hidden="true">
              <span className="meter meter--red" />
              <span className="meter meter--yellow" />
              <span className="meter meter--blue" />
            </div>
          </div>
        </section>

        <section className="home-stats" aria-label="DilSeFoodie activity">
          {statCards.map((item) => (
            <article className={'home-stat home-stat--' + item.tone} key={item.label}>
              <span className="home-stat__icon">{item.icon}</span>
              <strong>{item.value}+</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </section>

        <section className="home-shortcuts" aria-label="Food shortcuts">
          <Link to="/restaurants">late night</Link>
          <Link to="/restaurants">under 30 min</Link>
          <Link to="/restaurants">date food</Link>
          <Link to="/restaurants">comfort mode</Link>
        </section>
      </main>
    );
  }
}

export default Home;
