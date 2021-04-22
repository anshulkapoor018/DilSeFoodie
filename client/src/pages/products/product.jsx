import React, { useState, useContext } from 'react';
import CartContext from '../../cart/context';
import { formatCurrency } from '../../modules/string';

import './styles.css';

export default function Product({
  _id,
  restaurantId,
  name,
  price,
  imageUrl,
  description
}) {
  const [hover, setHover] = useState(false);
  const { addToCart } = useContext(CartContext);
  let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
  mode = mode.split('=')[1]
  if(mode==='light')
    {
    return (
      <div
        className={`product ${hover && 'hover'}`}
        onMouseEnter={() => setHover(true)}
        style = {{backgroundColor:"#000000"}}
        onMouseLeave={() => setHover(false)}>
        {hover && (
          <div
            className='add-to-cart'
            onClick={() =>
              addToCart({
                _id,
                name,
                price,
                imageUrl
              })
            }>
            +
          </div>
        )}
        <div className='orderCard'>
          <img src={imageUrl} alt={name} />
          <div className='name'>{name}</div>
          <div className='price'>Price: {formatCurrency(parseFloat(price))}</div>
        </div>
      </div>
    );
  }
  else{
    return (
      <div
        className={`product ${hover && 'hover'}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
        {hover && (
          <div
            className='add-to-cart'
            onClick={() =>
              addToCart({
                _id,
                name,
                price,
                imageUrl
              })
            }>
            +
          </div>
        )}
        <div className='orderCard'>
          <img src={imageUrl} alt={name} />
          <div className='name'>{name}</div>
          <div className='price'>Price: {formatCurrency(parseFloat(price))}</div>
        </div>
      </div>
    );
  }
}