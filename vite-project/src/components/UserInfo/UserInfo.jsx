import React, { useEffect, useState } from 'react';

const UserInfo = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/data');
                if (!response.ok) {
                    throw new Error('Nätverksfel.');
                }
                const data = await response.json();
                setUserData(data.data);
            } catch (err) {
                setError('Fel vid hämtning av data: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Laddar...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Användarinformation</h1>
            <p>ID: {userData.id}</p>
            <p>Namn: {userData.name}</p>
        </div>
    );
};

export default UserInfo;