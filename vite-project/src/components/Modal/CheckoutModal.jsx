// Modal.jsx
import React, { useState } from 'react';
import '../../components/Modal/CheckoutModal.css';

const Modal = ({ isOpen, onClose, cartItems, onSubmit }) => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [postalcode, setPostalcode] = useState('');
    const [city, setCity] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    if (!isOpen) return null;

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = () => {
        onSubmit({ name, email, phoneNumber, address, postalcode, city, paymentMethod });
        onClose(); 
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <h1>Checkout</h1>
                {step === 1 && (
                    <div>
                        <h2>Steg 1: Adressuppgifter</h2>
                        <input 
                            type="text" 
                            placeholder="För & efternamn" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                        <input 
                            type="email" 
                            placeholder="Epost-adress" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            type="text"
                            placeholder='Telefonummer'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder="Ange din adress" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                        />
                        <input 
                            type="number"
                            placeholder='Postnummer'
                            value={postalcode}
                            onChange={(e) => setPostalcode(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder="Ange din ort" 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)} 
                        />
                        <button onClick={handleNextStep}>Nästa</button>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2>Steg 2: Betalningsmetod</h2>
                        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="">Välj betalningsmetod</option>
                            <option value="credit">Kreditkort</option>
                            <option value="paypal">PayPal</option>
                            <option value="swish">Swish</option>
                            <option value="invoice">Faktura</option>
                        </select>
                        <button onClick={handleNextStep}>Nästa</button>
                        <button onClick={handlePreviousStep}>Tillbaka</button>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h2>Steg 3: Bekräfta beställning</h2>
                        <p><strong>Namn:</strong> {name}</p>
                        <p><strong>E-post:</strong> {email}</p>
                        <p><strong>Telefonnummer:</strong> {phoneNumber}</p>
                        <p><strong>Adress:</strong> {address}</p>
                        <p><strong>Postnummer:</strong> {postalcode}</p>
                        <p><strong>Ort:</strong> {city}</p>
                        <p><strong>Betalningsmetod:</strong> {paymentMethod}</p>
                        <button onClick={handleSubmit}>Skicka beställning</button>
                        <button onClick={handlePreviousStep}>Tillbaka</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;