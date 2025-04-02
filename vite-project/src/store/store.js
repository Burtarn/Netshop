import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../store/productSlice'
import cartReducer from '../store/cartSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;