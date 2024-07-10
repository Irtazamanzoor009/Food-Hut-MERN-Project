import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const counterSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    SetSearchValue: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { SetSearchValue } = counterSlice.actions

export default counterSlice.reducer