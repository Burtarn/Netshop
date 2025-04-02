import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner/Spinner'

const FetchOvrigt = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOthers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/ovrigt');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json(); 
                setData(data);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false); 
            }
        };

        fetchOthers();
    }, []);

    if (loading) {
        return <p><Spinner /></p>;
    }

    if (error) {
        return <p>Error..</p>;
    }

    return (
        <div>
            <h1>Övrigt:</h1>
            <ul>
                {data.map((others, index) => (
                    <li key={index}>
                        <p>{others.name}</p>
                        <p>{others.price} SEK</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FetchOvrigt;