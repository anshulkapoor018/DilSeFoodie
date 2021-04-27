import React from 'react';
import Cart from '../../cart';
import Header from '../../layout/header';

export default function CartPage() {
  let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
  mode = mode.split('=')[1]
  if(mode==='light') {
    return (
      <>
        <Header />
        <h1 style = {{backgroundColor: '#000000'}}>My Cart!</h1>
        <Cart />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <h1>My Cart!</h1>
        <Cart />
      </>
    );
  }
}