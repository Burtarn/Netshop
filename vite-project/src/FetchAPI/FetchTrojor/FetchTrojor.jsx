import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner/Spinner'

const FetchTrojor = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShirts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/trojor');
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

        fetchShirts();
    }, []);

    if (loading) {
        return <p><Spinner /></p>;
    }

    if (error) {
        return <p>Error..</p>;
    }

    return (
        <div>
            <h1>Tröjor:</h1>
            <ul>
                {data.map((shirts, index) => (
                    <li key={index}>
                        <p>{shirts.name}</p>
                        <p>{shirts.price} SEK</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FetchTrojor;