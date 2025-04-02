import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchProductsStart: (state) => {
        state.loading = true;
        state.error = null;
        },
        fetchProductsSuccess: (state, action) => {
        state.loading = false;
        state.items = action.payload;
        },
        fetchProductsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
        addProduct: (state, action) => {
        state.items.push(action.payload);
        },
    },
    });

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, addProduct } = productsSlice.actions;
export default productsSlice.reducer;