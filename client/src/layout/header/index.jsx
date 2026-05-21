import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaReceipt, FaShoppingCart, FaStore } from 'react-icons/fa';
import CartContext from '../../cart/context';
import './styles.css';

export default function Header() {
  const { cartItems } = useContext(CartContext);
  const currentResID = window.sessionStorage.getItem('resID') || window.location.pathname.split('/')[2];
  const cartQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className='order-nav' aria-label='Order navigation'>
      <Link className='order-nav__brand' to='/restaurants'>
        <span>DilSeFoodie</span>
        <small>order lab</small>
      </Link>
      <div className='order-nav__links'>
        <Link className='order-nav__link' to={`/res/${currentResID}`}>
          <FaStore />
          Restaurant
        </Link>
        <Link className='order-nav__link' to={`/orderItems/${currentResID}`}>
          <FaReceipt />
          Menu
        </Link>
        <Link className='order-nav__link order-nav__link--cart' to='/cart'>
          <FaShoppingCart />
          Cart
          <span>{cartQuantity}</span>
        </Link>
      </div>
    </nav>
  );
}
