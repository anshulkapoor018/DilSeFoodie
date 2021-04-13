import React, { useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Context from './context';
import { formatCurrency } from '../modules/string';
import './styles.css';

export default function Cart() {
  const { cartItems, changeQty, removeFromCart } = useContext(Context);
  // let cartTotal = 0;
  const [cartTotal, setCartTotal] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    let cartTotalRef = 0
    cartItems.map((product) => (
      cartTotalRef += product.price * product.qty
    ))
    setCartTotal(cartTotalRef)
  });

  function setCartStorage() {
    window.sessionStorage.setItem('cartTotal', formatCurrency(cartTotal));
    window.sessionStorage.setItem('cartItems', cartItems);
  }

  if (cartTotal === 0) {
    return (
      <p> Your Cart is Empty </p>
    );
  } else {
    return (
      <table id="orders" width='100%' cellSpacing={0} cellPadding={0}>
        <thead>
          <tr>
            <th>Product name</th>
            <th>Product</th>
            <th>Price</th>
            <th>Qauntity</th>
            <th>Subtotal</th>
            <th>Remove</th>
          </tr>
        </thead>
  
        <tbody>
          {cartItems.map((product) => (
            <tr key={product._id}>
              <td>
                {product.name}
              </td>
              <td>
                <img className = "cartImg" src={product.imageUrl} alt={product.name} />
              </td>
              <td>{formatCurrency(parseFloat(product.price))}</td>
              <td>
                <input
                  type="number"
                  value={product.qty}
                  min = "1"
                  onChange={(e) =>
                    changeQty(product, parseInt(e.target.value))
                  }
                />
              </td>
              <td>{formatCurrency(product.price * product.qty)}</td>
              <td>
                <button className = "cartRemove">
                  <img 
                  src="https://res.cloudinary.com/helpinghands101/image/upload/v1617992448/remove_aja2kg.png" 
                  alt="lassan" 
                  onClick={(e) =>
                    removeFromCart(product)
                  }
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
  
        <thead>
          <tr>
            <th>Cart Total</th>
            <th></th>
            <th></th>
            <th></th>
            <th>{formatCurrency(cartTotal)}</th>
            <th></th>
          </tr>
        </thead>
          <button className="button-cart">
            <span>
              <Link className = "orderLink" to='/checkout' 
              onClick={setCartStorage}>
                Review
              </Link>
            </span>
          </button>
      </table>
    );
  }
}
