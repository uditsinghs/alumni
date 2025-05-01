import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  isLoggedIn: false,
  allusers: [],
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
    setAllusers: (state, action) => {
      state.allusers = action.payload;

    },
  },
})


export const { login, getUser, logout ,setAllusers} = authSlice.actions

export default authSlice.reducer