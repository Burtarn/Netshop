import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../store/cartSlice';
import Modal from '../components/Modal/CheckoutModal'
import '../styles/Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); 

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemove = (item) => {
    dispatch(removeItem({ id: item.id }));
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2); 
  };

  const handleOrderSubmit = (orderDetails) => {
    console.log('Beställning skickad:', orderDetails);
    // Här kan du lägga till logik för att skicka beställningen till servern
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
              <button className="cart-button" onClick={() => handleRemove(item)}>Ta bort från varukorg</button>
            </div>
          ))}
        </div>
      )}
      <div className="total-amount">
        <h2>Totalt belopp: {getTotalAmount()} SEK</h2>
      </div>

      <div className='checkOut-container'>
        <h1>Checkout</h1>
        <button onClick={() => setIsModalOpen(true)}>Till kassan</button>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        cartItems={cartItems}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
};

export default Cart;