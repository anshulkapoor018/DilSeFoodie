import React from 'react';
import Seo from '../../seo';
import Cart from '../../cart';

export default function CheckoutPage() {
  return (
    <>
      <Seo title='Buy your stuff now!' />
      <h1>Buy my stuff!</h1>
      <Cart />
    </>
  );
}
