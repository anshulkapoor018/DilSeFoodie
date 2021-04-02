import React, { useContext } from 'react';
import Cart from '../../cart';
import Header from '../../layout/header';

export default function CartPage() {
  return (
    <>
      <Header />
      <h1>My Cart!</h1>
      <Cart />
    </>
  );
}
