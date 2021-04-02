import React from 'react';
import Product from './product';
import Header from '../../layout/header';
import products from '../../data/products.json';

export default function ProductsPage({}) {
  return (
    <>
      <Header />
      <h1>Welcome to our Food Menu!</h1>
      <div className='products'>
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </>
  );
}
