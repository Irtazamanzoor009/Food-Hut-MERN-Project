import { configureStore } from '@reduxjs/toolkit'
import searchValueReducer from './searchvalue/searchValue.js'
import cartReducer from './CartFunctionality/cartfunctions.js';

export const store = configureStore({
    reducer: {
        search: searchValueReducer,
        cart: cartReducer,
      },
})
