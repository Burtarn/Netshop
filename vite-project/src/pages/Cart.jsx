import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../store/cartSlice';
import '../styles/Cart.css'

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); 

  const handleRemove = (item) => {
    dispatch(removeItem({ id: item.id }));
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Din varukorg är tom.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <p>{item.name}</p>
              <img src={item.image} alt={item.name} className="cart-image" />
              <p>{item.description}</p>
              <p>{item.price} SEK</p>
              <button className="cart-button" onClick={() => handleRemove(item)}>Ta bort</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;