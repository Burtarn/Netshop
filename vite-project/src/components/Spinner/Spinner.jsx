import React from 'react';
import '../../styles/Spinner.css'

const Spinner = () => {
    return (
        <div className="container">
            <h1>Loading...</h1>
            <div className="spinner"></div>
        </div>
    );
};

export default Spinner;