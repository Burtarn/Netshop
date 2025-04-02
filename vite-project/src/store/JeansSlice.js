import { createSlice } from '@reduxjs/toolkit';

const jeansSlice = createSlice({
  name: 'jeans',
  initialState: {
    items: [],
  },
  reducers: {
    addJeans: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addJeans } = jeansSlice.actions;
export default jeansSlice.reducer;