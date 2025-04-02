import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
  const cartItems = useSelector((state) => state.jeans.items); 

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Din varukorg är tom.</p>
      ) : (
        <ul>
          {cartItems.map((jeans, index) => (
            <li key={index}>
              <p>{jeans.name}</p>
              <p>{jeans.price} SEK</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;