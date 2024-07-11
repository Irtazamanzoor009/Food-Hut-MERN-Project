import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      const { id,size, updates } = action.payload;
      const item = state.items.find(item => item.size === size && item.id === id);
      if (item) {
        Object.assign(item, updates);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => !(item.id === action.payload.id && item.size === action.payload.size));
    },
    clearCart: () => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart, cartLength, updateItem } = cartSlice.actions;
export const selectCartLength = (state) => state.cart.items.length;
export const selectCartItems = (state) => state.cart.items;
export default cartSlice.reducer;
