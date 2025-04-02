import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner/Spinner'

const FetchTshirtData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTshirts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/tshirt');
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

        fetchTshirts();
    }, []);

    if (loading) {
        return <p> < Spinner /> </p>;
    }

    if (error) {
        return <p>Error..</p>;
    }

    return (
        <>
            <ul>
                {data.map((tshirt, index) => (
                    <li key={index}>
                        <p>{tshirt.name}</p>
                        <p>{tshirt.price}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default FetchTshirtData;