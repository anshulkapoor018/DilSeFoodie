import { useState } from 'react';

export default function useCart() {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    setCartItems((prev) => {
      const existing = cartItems.find(
        (item) => item._id === product._id,
      );

      return existing
        ? [
            ...cartItems.map((item) =>
              item._id === product._id
                ? { ...item, qty: item.qty + 1 }
                : item,
            ),
          ]
        : [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(product) {
    setCartItems((prev) => [
      ...prev.filter((item) => item._id !== product._id),
    ]);
  }

  function changeQty(product, qty) {
    if (qty === 0) return removeFromCart(product);

    setCartItems((prev) => [
      ...prev.map((item) =>
        item._id === product._id ? { ...item, qty } : item,
      ),
    ]);
  }

  return {
    cartItems,
    addToCart,
    removeFromCart,
    changeQty,
  };
}
