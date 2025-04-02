import React, { useState, useEffect } from 'react';
import '../../styles/MyForm.css'; 

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [fadeIn, setFadeIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (!response.ok) {
                throw new Error('Något gick fel med begäran');
            }

            const data = await response.json();
            console.log(data);

            setName('');
            setEmail('');
            setMessage('');

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

        useEffect(() => {
          setFadeIn(true); 
      }, []);
    

    return (
        <div className={`container ${fadeIn ? 'fade-in' : ''}`}>
            <h1>Skapa ett formulär</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <h2>Namn:</h2>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>
                        <h2>E-post:</h2>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>
                        <h2>Meddelande:</h2>
                    </label>
                    <input
                        type="text" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Skicka</button>
            </form>
        </div>
    );
}

export default App;