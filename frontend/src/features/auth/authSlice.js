import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  isLoggedIn: false,
  allusers: [],
  unverified:[],
  isLoading:true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state,action) => {
      state.user = action.payload;
      state.isLoggedIn = true

    },
    getUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
         isLoading=false;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    setAllusers: (state, action) => {
      state.allusers = action.payload;

    },
    setUnverifiedusers: (state, action) => {
      state.unverified = state.unverified.filter((user) => user._id !== action.payload);
    },
    setUnverifiedusersList: (state, action) => {
      state.unverified = action.payload;
    }
  },
})


export const { login, getUser, logout ,setAllusers,setUnverifiedusers,setUnverifiedusersList} = authSlice.actions

export default authSlice.reducer
