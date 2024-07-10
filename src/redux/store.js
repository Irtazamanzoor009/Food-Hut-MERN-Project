import { configureStore } from '@reduxjs/toolkit'
import searchValueReducer from './searchvalue/searchValue.js'

export const store = configureStore({
    reducer: {
        search: searchValueReducer,
      },
})
