import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../cart/context';
import './styles.css';

export default function Header({}) {
  const { cartItems } = useContext(CartContext);
  const currentResID = window.sessionStorage.getItem('resID');
  const currentResStore = '/orderItems/' + currentResID;
  const currentResPage = '/res/' + currentResID;
  let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
  mode = mode.split('=')[1]
  if(mode==='light')
  {
    return (
      <div className='__dml header'>
        <ul>
          <li>
            <Link className = "orderLink" style = {{color:'white'}} to={currentResPage}>Restaurant</Link>
          </li>

          <li>
            <Link className = "orderLink" style = {{color:'white'}} to={currentResStore}>Store</Link>
          </li>

          <li>
            <Link className = "orderLink" style = {{color:'white'}} to='/cart'>Cart:</Link> (
            {cartItems.reduce((acc, item) => acc + item.qty, 0)})
          </li>
        </ul>
      </div>
    );
  }
  else{
    return (
      <div className='__dml header'>
        <ul>
          <li>
            <Link className = "orderLink" to={currentResPage}>Restaurant</Link>
          </li>

          <li>
            <Link className = "orderLink" to={currentResStore}>Store</Link>
          </li>

          <li>
            <Link className = "orderLink" to='/cart'>Cart:</Link> (
            {cartItems.reduce((acc, item) => acc + item.qty, 0)})
          </li>
        </ul>
      </div>
    );
  }
}
