
import { configureStore } from '@reduxjs/toolkit';
import jeansReducer from '../store/JeansSlice';

const store = configureStore({
  reducer: {
    jeans: jeansReducer, 
  },
});

export default store;