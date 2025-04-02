import React, { useEffect, useState } from 'react';
import '../FetchJeans/FetchJeans.css'
import { useDispatch } from 'react-redux';
import { addJeans } from '../../store/JeansSlice'

const Jeans = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchJeans() {
      try {
        const response = await fetch("http://localhost:5000/api/jeans");
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log('error!');
        setError(true);
        setLoading(false);
      }
    }
    fetchJeans();
  }, []);

  const handleBuy = (jeans) => {
    dispatch(addJeans(jeans));
  };

  if (loading) {
    return <p>Loading..</p>;
  }

  if (error) {
    return <p>Error i hämtning av data.</p>;
  }

  return (
    <div className="jeans-container">
      {data.map((jeans) => (
        <div className="jeans-item" key={jeans.id}>
          <p>{jeans.name}</p>
          <img src={jeans.image} alt={jeans.name} className="jeans-image" />
          <p>{jeans.description}</p>
          <p>{jeans.price} SEK</p>
          <button onClick={() => handleBuy(jeans)}>Köp</button>
        </div>
      ))}
    </div>
  );
};

export default Jeans;