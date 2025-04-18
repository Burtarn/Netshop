import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css'; 

const Login = () => {
    const { setIsAuthenticated } = useAuth(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [fadeIn, setFadeIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault(); // Förhindra standardformulärs beteende
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Fel användarnamn eller lösenord');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // Spara token i lokal lagring
            setIsAuthenticated(true); 
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
      setFadeIn(true); 
    }, []);

    return (
        <div className={`container ${fadeIn ? 'fade-in' : ''}`}>
            <h2>Logga in</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Användarnamn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Logga in</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Login;