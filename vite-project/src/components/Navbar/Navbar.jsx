import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; 
import { useAuth } from '../../context/AuthContext'; 
import '../../styles/Navbar.css';
import { useSelector } from 'react-redux';

const Navbar = () => {
    
    const cartItems = useSelector((state) => state.cart.items); 
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    return (
        <header className="header">
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="logo">NETSHOP</div>
                    <div className="menu-icon" onClick={toggleMenu}>
                        &#9776;
                    </div>
                    <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        {isAuthenticated && <li><Link to="/profile">Profile</Link></li>} 
                    </ul>
                    <div className="icons">
                        <Link to="/cart" className="icon"> 
                            <FontAwesomeIcon icon={faShoppingCart} />
                            {cartItems.length > 0 && (
                                <span className="cart-badge">{cartItems.length}</span>
                            )}
                        </Link>
                        <Link to="/login" className="icon">
                            <FontAwesomeIcon icon={faUser} />
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;