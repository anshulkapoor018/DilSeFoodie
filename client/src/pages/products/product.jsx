import React, { useState, useContext } from 'react';
import CartContext from '../../cart/context';

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
            })
          }>
          +<div>add to cart</div>
        </div>
      )}
      <div className='orderCard'>
        <img src={imageUrl} alt={name} />
        <div className='name'>{name}</div>
        <div className='price'>Price: {price}</div>
      </div>
    </div>
  );
}
