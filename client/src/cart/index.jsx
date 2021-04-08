import React, { useContext, useEffect, useState} from 'react';
import Context from './context';
import { formatCurrency } from '../modules/string';
import './styles.css';

export default function Cart() {
  const { cartItems, changeQty } = useContext(Context);
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

  return (
    <table id="orders" width='100%' cellSpacing={0} cellPadding={0}>
      <thead>
        <tr>
          <th>Product name</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Subtotal</th>
        </tr>
      </thead>

      <tbody>
        {cartItems.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              <input
                type='text'
                value={product.qty}
                onChange={(e) =>
                  changeQty(product, parseInt(e.target.value))
                }
              />
            </td>
            <td>{formatCurrency(product.price * product.qty)}</td>
          </tr>
        ))}
      </tbody>

      <thead>
        <tr>
          <th>Cart Total</th>
          <th></th>
          <th></th>
          <th>{formatCurrency(cartTotal)}</th>
        </tr>
      </thead>
    </table>
  );
}
