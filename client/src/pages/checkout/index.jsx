import React, { useContext, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaBicycle, FaCheckCircle, FaMapMarkerAlt, FaReceipt, FaShoppingBasket, FaStore } from 'react-icons/fa';
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
import Header from '../../layout/header';
import CartContext from '../../cart/context';
import { formatCurrency } from '../../modules/string';
import apiBaseUrl from '../../config/api';
import './styles.css';

const STATES = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
];

const emptyForm = {
  firstName: '',
  lastName: '',
  mobile: '',
  address: '',
  zipcode: '',
  city: '',
  stateVal: 'NJ'
};

function showNotification(type, message) {
  const timer = 1500;
  if (type === 'error') {
    NotificationManager.error(message, '', timer);
  } else if (type === 'success') {
    NotificationManager.success(message, '', timer);
  } else if (type === 'warning') {
    NotificationManager.warning(message, '', timer);
  }
}

function getSessionJson(key, fallback) {
  try {
    const value = window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function normalizePhone(value) {
  return value.replace(/\D/g, '');
}

export default function CheckoutPage() {
  const { cartItems } = useContext(CartContext);
  const [orderType, setOrderType] = useState('Delivery');
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const storedCartItems = getSessionJson('cartItems', []);
  const orderItems = cartItems.length ? cartItems : storedCartItems;
  const cartQuantity = orderItems.reduce((total, item) => total + item.qty, 0);
  const cartTotal = orderItems.reduce((total, item) => total + parseFloat(item.price || 0) * item.qty, 0);
  const isLoggedIn = getSessionJson('isLoggedIn', false);

  const summaryRows = useMemo(
    () => [
      ['items', cartQuantity],
      ['method', orderType.toLowerCase()],
      ['payment', formatCurrency(cartTotal)]
    ],
    [cartQuantity, cartTotal, orderType]
  );

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function validateForm() {
    const phone = normalizePhone(form.mobile);

    if (!form.firstName.trim()) return 'First name is required.';
    if (!form.lastName.trim()) return 'Last name is required.';
    if (phone.length !== 10) return 'Enter a 10 digit mobile number.';

    if (orderType === 'Delivery') {
      if (!form.address.trim()) return 'Delivery address is required.';
      if (!form.city.trim()) return 'City is required.';
      if (!form.stateVal.trim()) return 'State is required.';
      if (!/^\d{5}$/.test(form.zipcode.trim())) return 'Enter a 5 digit zip code.';
    }

    if (!orderItems.length) return 'Your cart is empty.';
    return '';
  }

  function routeToLogin(event) {
    event.preventDefault();
    window.location = '/user';
  }

  async function submitCheckoutDetails(event) {
    event.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      showNotification('error', validationError);
      return;
    }

    const userDetails = getSessionJson('userDetails', {});
    const currentResID = window.sessionStorage.getItem('resID');

    setIsSubmitting(true);

    const orderPostBody = {
      restaurantId: currentResID,
      userId: userDetails._id,
      payment: formatCurrency(cartTotal),
      typeOfOrder: orderType,
      timeOfOrder: new Date().toLocaleString(),
      orderStatus: 'atRestaurant',
      orderItems
    };

    try {
      const response = await axios.post(`${apiBaseUrl}/order/placeOrder`, orderPostBody);

      if (response.data && response.data.success === false) {
        showNotification('error', response.data.message || 'Order could not be placed.');
        setIsSubmitting(false);
        return;
      }

      window.sessionStorage.setItem('cartTotal', formatCurrency(cartTotal));
      window.sessionStorage.setItem('cartItems', JSON.stringify(orderItems));
      showNotification('success', 'Successfully placed order!');
      setForm(emptyForm);
      setTimeout(() => {
        window.location = '/profile';
      }, 1500);
    } catch (error) {
      showNotification('error', 'Order could not be placed.');
      setIsSubmitting(false);
    }
  }

  if (!orderItems.length) {
    return (
      <>
        <Header />
        <main className='checkout-page'>
          <section className='checkout-shell checkout-shell--empty'>
            <div className='checkout-empty'>
              <div className='checkout-empty__icon'>
                <FaShoppingBasket />
              </div>
              <p className='checkout-kicker'>checkout console</p>
              <h1>Cart needs a dish first.</h1>
              <p>Add at least one menu item before checkout so the kitchen has something to work with.</p>
              <Link className='checkout-button checkout-button--ghost' to='/restaurants'>
                Browse restaurants
              </Link>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className='checkout-page'>
        <section className='checkout-shell'>
          <div className='checkout-hero'>
            <div>
              <p className='checkout-kicker'>checkout console</p>
              <h1>Lock the order.</h1>
              <p>Choose delivery or pickup, add contact details, and send the ticket to the restaurant.</p>
            </div>
            <div className='checkout-hero__meter'>
              <FaCheckCircle />
              <span>{cartQuantity} item{cartQuantity === 1 ? '' : 's'} ready</span>
            </div>
          </div>

          <div className='checkout-layout'>
            <section className='checkout-card checkout-card--form'>
              <div className='checkout-tabs' aria-label='Order type'>
                <button
                  type='button'
                  className={orderType === 'Delivery' ? 'is-selected' : ''}
                  onClick={() => setOrderType('Delivery')}
                >
                  <FaBicycle />
                  Delivery
                </button>
                <button
                  type='button'
                  className={orderType === 'Pickup' ? 'is-selected' : ''}
                  onClick={() => setOrderType('Pickup')}
                >
                  <FaStore />
                  Pickup
                </button>
              </div>

              <form className='checkout-form' onSubmit={submitCheckoutDetails}>
                <div className='checkout-fields checkout-fields--split'>
                  <label className='checkout-field'>
                    <span>First name</span>
                    <input name='firstName' type='text' value={form.firstName} onChange={updateField} />
                  </label>
                  <label className='checkout-field'>
                    <span>Last name</span>
                    <input name='lastName' type='text' value={form.lastName} onChange={updateField} />
                  </label>
                </div>

                <label className='checkout-field'>
                  <span>Mobile number</span>
                  <input name='mobile' type='tel' value={form.mobile} placeholder='201-555-0198' onChange={updateField} />
                </label>

                {orderType === 'Delivery' && (
                  <>
                    <label className='checkout-field'>
                      <span>Delivery address</span>
                      <input name='address' type='text' value={form.address} onChange={updateField} />
                    </label>
                    <div className='checkout-fields checkout-fields--address'>
                      <label className='checkout-field'>
                        <span>City</span>
                        <input name='city' type='text' value={form.city} onChange={updateField} />
                      </label>
                      <label className='checkout-field'>
                        <span>State</span>
                        <select name='stateVal' value={form.stateVal} onChange={updateField}>
                          {STATES.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className='checkout-field'>
                        <span>Zip</span>
                        <input name='zipcode' type='text' value={form.zipcode} onChange={updateField} />
                      </label>
                    </div>
                  </>
                )}

                {isLoggedIn ? (
                  <button className='checkout-button checkout-button--primary' type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Sending order' : 'Place order'}
                  </button>
                ) : (
                  <button className='checkout-button checkout-button--primary' type='button' onClick={routeToLogin}>
                    Login to proceed
                  </button>
                )}
              </form>
            </section>

            <aside className='checkout-card checkout-summary'>
              <p className='checkout-kicker'>order tape</p>
              <h2>{orderType}</h2>
              <div className='checkout-summary__icon'>
                {orderType === 'Delivery' ? <FaMapMarkerAlt /> : <FaStore />}
              </div>
              <div className='checkout-summary__rows'>
                {summaryRows.map(([label, value]) => (
                  <React.Fragment key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </React.Fragment>
                ))}
              </div>
              <div className='checkout-items'>
                <p className='checkout-kicker'>items</p>
                {orderItems.map((item) => (
                  <div className='checkout-items__row' key={item._id}>
                    <span>{item.qty}x {item.name}</span>
                    <strong>{formatCurrency(parseFloat(item.price || 0) * item.qty)}</strong>
                  </div>
                ))}
              </div>
              <Link className='checkout-button checkout-button--ghost' to='/cart'>
                <FaReceipt />
                Edit cart
              </Link>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
