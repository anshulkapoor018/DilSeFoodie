import React from 'react';
import Header from './header';
import './styles.css';

export default function Layout({ children }) {
  return (
    <div className='__dml container'>
      {children}
    </div>
  );
}
