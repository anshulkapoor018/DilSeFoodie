import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus, FaReceipt, FaShoppingBasket, FaTrash } from 'react-icons/fa';
import Context from './context';
import { formatCurrency } from '../modules/string';
import './styles.css';

export default function Cart() {
  const { cartItems, changeQty, removeFromCart } = useContext(Context);
  const cartTotal = cartItems.reduce((total, product) => total + parseFloat(product.price || 0) * product.qty, 0);
  const cartQuantity = cartItems.reduce((total, product) => total + product.qty, 0);

  function setCartStorage() {
    window.sessionStorage.setItem('cartTotal', formatCurrency(cartTotal));
    window.sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  function updateQty(product, nextQty) {
    changeQty(product, Math.max(0, nextQty));
  }

  if (cartItems.length === 0) {
    return (
      <main className='cart-page'>
        <section className='cart-shell cart-shell--empty'>
          <div className='cart-empty'>
            <div className='cart-empty__icon'>
              <FaShoppingBasket />
            </div>
            <p className='cart-kicker'>cart mixer</p>
            <h1>Your cart is empty.</h1>
            <p>Pick a restaurant, add a few dishes, and this panel will turn into your order review deck.</p>
            <Link className='cart-button cart-button--ghost' to='/restaurants'>
              Browse restaurants
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className='cart-page'>
      <section className='cart-shell'>
        <div className='cart-hero'>
          <div>
            <p className='cart-kicker'>cart mixer</p>
            <h1>Review your stack.</h1>
            <p>Adjust quantities, clear anything extra, then hand this order over to checkout.</p>
          </div>
          <div className='cart-hero__badge'>
            <FaReceipt />
            <span>{cartQuantity} item{cartQuantity === 1 ? '' : 's'}</span>
          </div>
        </div>

        <div className='cart-layout'>
          <section className='cart-items' aria-label='Cart items'>
            {cartItems.map((product) => {
              const price = parseFloat(product.price || 0);
              const subtotal = price * product.qty;

              return (
                <article className='cart-item' key={product._id}>
                  <img className='cart-item__image' src={product.imageUrl} alt={product.name} />
                  <div className='cart-item__body'>
                    <p className='cart-kicker'>dish</p>
                    <h2>{product.name}</h2>
                    <span>{formatCurrency(price)} each</span>
                  </div>
                  <div className='cart-stepper' aria-label={`${product.name} quantity`}>
                    <button type='button' onClick={() => updateQty(product, product.qty - 1)} aria-label='Decrease quantity'>
                      <FaMinus />
                    </button>
                    <input
                      type='number'
                      value={product.qty}
                      min='1'
                      onChange={(event) => updateQty(product, parseInt(event.target.value || '0', 10))}
                    />
                    <button type='button' onClick={() => updateQty(product, product.qty + 1)} aria-label='Increase quantity'>
                      <FaPlus />
                    </button>
                  </div>
                  <div className='cart-item__subtotal'>
                    <span>subtotal</span>
                    <strong>{formatCurrency(subtotal)}</strong>
                  </div>
                  <button className='cart-remove' type='button' onClick={() => removeFromCart(product)} aria-label='Remove item'>
                    <FaTrash />
                  </button>
                </article>
              );
            })}
          </section>

          <aside className='cart-summary'>
            <p className='cart-kicker'>checkout signal</p>
            <h2>Order total</h2>
            <strong>{formatCurrency(cartTotal)}</strong>
            <div className='cart-summary__rows'>
              <span>items</span>
              <span>{cartQuantity}</span>
              <span>pickup</span>
              <span>restaurant counter</span>
            </div>
            <Link className='cart-button cart-button--primary' to='/checkout' onClick={setCartStorage}>
              Review checkout
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
