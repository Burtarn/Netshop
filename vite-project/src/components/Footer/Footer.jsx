    import React from 'react';
    import '../../components/Footer/Footer.css';

    const Footer = () => {
    return (
        <footer className="footer">
        <div className="footer-content">
            <p>© 2025 NETSHOP. Alla rättigheter förbehållna.</p>
            <div className="footer-social-icons">
            <a href="#" className="footer-icon">Facebook</a>
            <a href="#" className="footer-icon">Twitter</a>
            <a href="#" className="footer-icon">Instagram</a>
            </div>
        </div>
        </footer>
    );
    };

    export default Footer;