import React, { useContext } from 'react';
import { FaPlus, FaShoppingBag } from 'react-icons/fa';
import CartContext from '../../cart/context';
import { formatCurrency } from '../../modules/string';

import './styles.css';

const fallbackImage =
  'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=900&q=80';

export default function Product({ _id, name, price, imageUrl, description }) {
  const { addToCart } = useContext(CartContext);
  const numericPrice = parseFloat(price);

  const addItem = () =>
    addToCart({
      _id,
      name,
      price,
      imageUrl: imageUrl || fallbackImage
    });

  return (
    <article className='menu-item'>
      <div className='menu-item__image'>
        <img src={imageUrl || fallbackImage} alt={name} />
        <span>
          <FaShoppingBag />
          order
        </span>
      </div>
      <div className='menu-item__body'>
        <div>
          <p className='menu-item__label'>dish</p>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <div className='menu-item__footer'>
          <strong>{Number.isNaN(numericPrice) ? price : formatCurrency(numericPrice)}</strong>
          <button type='button' className='menu-button menu-button--add' onClick={addItem}>
            <FaPlus />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
