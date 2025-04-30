import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  isLoggedIn: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true

    },
    getUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true
    },  
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },

  },
})


export const { login, getUser,logout} = authSlice.actions

export default authSlice.reducer