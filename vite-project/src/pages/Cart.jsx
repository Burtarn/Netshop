import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../store/cartSlice';
import Modal from '../components/Modal/CheckoutModal';
import '../styles/Cart.css';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCouponVisible, setIsCouponVisible] = useState(false);
    const [couponCode, setCouponCode] = useState('');

    const groupCartItems = (items) => {
        const groupedItems = {};
        items.forEach(item => {
            if (groupedItems[item.id]) {
                groupedItems[item.id].quantity += 1; 
            } else {
                groupedItems[item.id] = { ...item, quantity: 1 }; 
            }
        });
        return Object.values(groupedItems); 
    };

    const groupedCartItems = groupCartItems(cartItems);

    const handleRemove = (item) => {
        dispatch(removeItem({ id: item.id }));
    };

    const getTotalAmount = () => {
        return groupedCartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2); 
    };

    const handleOrderSubmit = (orderDetails) => {
        console.log('Beställning skickad:', orderDetails);
    };

    const toggleCouponInput = () => {
        setIsCouponVisible((prev) => !prev);
    };

    return (
        <div className="cart-container">
            <h1>Cart</h1>
            {groupedCartItems.length === 0 ? (
                <p className="empty-cart">Din varukorg är tom.</p>
            ) : (
                <div className="cart-items">
                    {groupedCartItems.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <p>{item.name}</p> 
                            <img src={item.image} alt={item.name} className="cart-image" />
                            <p>{item.description}</p>
                            <p>{item.price} SEK</p>
                            <p>Antal tillagda: {item.quantity}</p>
                            <button className="cart-button" onClick={() => handleRemove(item)}>Ta bort från varukorg</button>
                        </div>
                    ))}
                </div>
            )}
            <div className="total-amount">
                <h2>Totalt belopp: {getTotalAmount()} SEK</h2>
            </div>

            <div className='coupon-section'>
                <p onClick={toggleCouponInput} style={{ cursor: 'pointer', color: 'red' }}>
                    Har du en rabattkod?
                </p>
                {isCouponVisible && (
                    <div className={isCouponVisible ? 'active' : ''}>
                        <input 
                            type="text" 
                            value={couponCode} 
                            onChange={(e) => setCouponCode(e.target.value)} 
                            placeholder="Skriv in rabattkod" 
                        />
                        <button onClick={() => console.log('Rabattkod:', couponCode)}>Använd rabattkod</button>
                    </div>
                )}
            </div>

            <div className='checkOut-container'>
                <h1>Checkout</h1>
                <button className="checkout-button" onClick={() => setIsModalOpen(true)}>Till kassan</button>
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                cartItems={groupedCartItems} 
                onSubmit={handleOrderSubmit}
            />
        </div>
    );
};

export default Cart;