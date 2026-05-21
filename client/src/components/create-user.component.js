import React, { Component } from 'react';
import axios from 'axios';
import { FaLock, FaRegUserCircle, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import '../styles/_loginSty.scss';
import apiBaseUrl from '../config/api';

import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';

function showNotification(type, message) {
  const timer = 2000;

  if (type === 'error') {
    NotificationManager.error(message, '', timer);
  } else if (type === 'success') {
    NotificationManager.success(message, '', timer);
  } else if (type === 'warning') {
    NotificationManager.warning(message, '', timer);
  }
}

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function storeUserSession(userDetails) {
  window.sessionStorage.setItem('isLoggedIn', 'true');
  window.sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
}

export default class AuthCredentials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePanel: 'login'
    };
  }

  componentDidMount() {
    if (window.sessionStorage.getItem('isLoggedIn') === 'true') {
      window.location = '/profile';
    }
  }

  setActivePanel(activePanel) {
    this.setState({ activePanel });
  }

  render() {
    const { activePanel } = this.state;

    return (
      <main className="auth-page">
        <section className="auth-shell">
          <div className="auth-hero">
            <p className="auth-kicker">account console</p>
            <h1>{activePanel === 'login' ? 'Welcome back.' : 'Join the table.'}</h1>
            <p>
              Sign in to keep orders, checkout, and your local food trail connected.
            </p>
          </div>

          <div className="auth-card">
            <div className="auth-tabs" aria-label="Account mode">
              <button
                className={activePanel === 'login' ? 'is-selected' : ''}
                type="button"
                onClick={() => this.setActivePanel('login')}
              >
                <FaSignInAlt />
                Login
              </button>
              <button
                className={activePanel === 'register' ? 'is-selected' : ''}
                type="button"
                onClick={() => this.setActivePanel('register')}
              >
                <FaUserPlus />
                Register
              </button>
            </div>

            {activePanel === 'login' ? (
              <LoginBox />
            ) : (
              <RegisterBox onRegistered={() => this.setActivePanel('login')} />
            )}
          </div>
        </section>
      </main>
    );
  }
}

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSubmitting: false
    };
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submitLogin = async (event) => {
    event.preventDefault();

    const user = {
      email: this.state.email.trim().toLowerCase(),
      password: this.state.password
    };

    if (!isEmailValid(user.email)) {
      showNotification('error', 'Enter a valid email.');
      return;
    }

    if (user.password.length < 6) {
      showNotification('error', 'Password must be at least 6 characters.');
      return;
    }

    this.setState({ isSubmitting: true });

    try {
      const response = await axios.post(`${apiBaseUrl}/user/login`, user);

      if (response.data.message) {
        showNotification('error', 'Wrong email or password.');
        this.setState({ isSubmitting: false });
        return;
      }

      if (response.data.redirect === '/') {
        storeUserSession(response.data.userDetails);
        showNotification('success', 'Login successful.');
        setTimeout(() => {
          window.location = '/profile';
        }, 700);
      } else {
        this.setState({ isSubmitting: false });
      }
    } catch (error) {
      showNotification('error', 'Login failed. Please try again.');
      this.setState({ isSubmitting: false });
    }
  }

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitLogin}>
        <label className="auth-field">
          <span>Email</span>
          <div>
            <FaRegUserCircle />
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
        </label>

        <label className="auth-field">
          <span>Password</span>
          <div>
            <FaLock />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              placeholder="password"
              autoComplete="current-password"
            />
          </div>
        </label>

        <button className="auth-button" type="submit" disabled={this.state.isSubmitting}>
          {this.state.isSubmitting ? 'Signing in' : 'Login'}
        </button>
      </form>
    );
  }
}

class RegisterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isSubmitting: false
    };
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submitRegister = async (event) => {
    event.preventDefault();

    const user = {
      firstName: this.state.firstName.trim(),
      lastName: this.state.lastName.trim(),
      email: this.state.email.trim().toLowerCase(),
      password: this.state.password
    };

    if (user.firstName.length < 2) {
      showNotification('error', 'First name must be at least 2 characters.');
      return;
    }

    if (user.lastName.length < 2) {
      showNotification('error', 'Last name must be at least 2 characters.');
      return;
    }

    if (!isEmailValid(user.email)) {
      showNotification('error', 'Enter a valid email.');
      return;
    }

    if (user.password.length < 6) {
      showNotification('error', 'Password must be at least 6 characters.');
      return;
    }

    this.setState({ isSubmitting: true });

    try {
      const signupResponse = await axios.post(`${apiBaseUrl}/user/signup`, user);

      if (signupResponse.data.email_use === true) {
        showNotification('error', 'An account with this email already exists.');
        this.setState({ isSubmitting: false });
        return;
      }

      if (signupResponse.data.success === false) {
        showNotification('error', signupResponse.data.message || 'Signup failed. Please try again.');
        this.setState({ isSubmitting: false });
        return;
      }

      const loginResponse = await axios.post(`${apiBaseUrl}/user/login`, {
        email: user.email,
        password: user.password
      });

      if (loginResponse.data && loginResponse.data.userDetails) {
        storeUserSession(loginResponse.data.userDetails);
        showNotification('success', 'Account created. You are signed in.');
        setTimeout(() => {
          window.location = '/profile';
        }, 700);
        return;
      }

      showNotification('success', 'Account created. Please sign in.');
      this.props.onRegistered();
      this.setState({ ...user, password: '', isSubmitting: false });
    } catch (error) {
      showNotification('error', 'Signup failed. Please try again.');
      this.setState({ isSubmitting: false });
    }
  }

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitRegister}>
        <div className="auth-field-grid">
          <label className="auth-field">
            <span>First name</span>
            <div>
              <FaRegUserCircle />
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.onChange}
                placeholder="First"
                autoComplete="given-name"
              />
            </div>
          </label>

          <label className="auth-field">
            <span>Last name</span>
            <div>
              <FaRegUserCircle />
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.onChange}
                placeholder="Last"
                autoComplete="family-name"
              />
            </div>
          </label>
        </div>

        <label className="auth-field">
          <span>Email</span>
          <div>
            <FaRegUserCircle />
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
        </label>

        <label className="auth-field">
          <span>Password</span>
          <div>
            <FaLock />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              placeholder="6+ characters"
              autoComplete="new-password"
            />
          </div>
        </label>

        <button className="auth-button" type="submit" disabled={this.state.isSubmitting}>
          {this.state.isSubmitting ? 'Creating account' : 'Create account'}
        </button>
      </form>
    );
  }
}
