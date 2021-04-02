import React, { useContext } from 'react';
import Seo from '../../seo';
import Cart from '../../cart';

export default function CartPage() {
  return (
    <>
      <Seo title='My cart' />
      <h1>My cart</h1>
      <Cart />
    </>
  );
}
