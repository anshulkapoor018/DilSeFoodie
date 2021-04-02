import React from 'react';
import Cart from '../../cart';
import Header from '../../layout/header';

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <h1>Checkout Amazing Meal!</h1>
      <Cart />
    </>
  );
}
