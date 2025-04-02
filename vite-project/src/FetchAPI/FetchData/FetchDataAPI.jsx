import React, { useEffect } from 'react';
import '../FetchData/FetchDataAPI.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, addProduct } from '../../store/productSlice'
import { addItem } from '../../store/cartSlice'

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
};

const ProductsData = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        async function fetchAllData() {
        dispatch(fetchProductsStart());
        try {
            const urls = [
            "http://localhost:5000/api/jeans",
            "http://localhost:5000/api/ovrigt",
            "http://localhost:5000/api/trojor",
            "http://localhost:5000/api/tshirt"
            ];
            const results = await Promise.all(urls.map(fetchData));
            const combinedData = results.flat();
            dispatch(fetchProductsSuccess(combinedData));
        } catch (error) {
            console.log('Error fetching data:', error);
            dispatch(fetchProductsFailure(error.message));
        }
        }
        fetchAllData();
    }, [dispatch]);

    const handleBuy = (item) => {
        dispatch(addItem(item)); 
    };

    if (loading) {
        return <p>Loading..</p>;
    }

    if (error) {
        return <p>Error i hämtning av data: {error}</p>;
    }

    return (
        <div className="jeans-container">
        {items.map((item) => (
            <div className="jeans-item" key={item.id}>
            <p>{item.name}</p>
            <img src={item.image} alt={item.name} className="jeans-image" />
            <p>{item.description}</p>
            <p>{item.price} SEK</p>
            <button onClick={() => handleBuy(item)}>Köp</button>
            </div>
        ))}
        </div>
    );
    };

export default ProductsData;