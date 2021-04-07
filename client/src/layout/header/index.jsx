import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../cart/context';
import './styles.css';

export default function Header({}) {
  const { cartItems } = useContext(CartContext);
  const currentResID = window.sessionStorage.getItem('resID');
  const currentResStore = '/orderItems/' + currentResID;
  return (
    <div className='__dml header'>
      <ul>

        <li>
          <Link className = "orderLink" to={currentResStore}>Store</Link>
        </li>

        <li>
          <Link className = "orderLink" to='/cart'>Cart:</Link> (
          {cartItems.reduce((acc, item) => acc + item.qty, 0)})
        </li>

        <li>
          <Link className = "orderLink" to='/checkout'>Checkout</Link>
        </li>
      </ul>
    </div>
  );
}
