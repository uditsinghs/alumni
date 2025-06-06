import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  isLoggedIn: false,
  allusers: [],
  unverified:[],
  // isLoading:true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      // state.isLoading = false;

    },
    // getUser: (state, action) => {
    //   state.user = action.payload;
    //   state.isLoggedIn = true;
    //   // state.isLoading = false;
    // },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      // state.isLoading = false;
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


export const { login, logout ,setAllusers,setUnverifiedusers,setUnverifiedusersList} = authSlice.actions

export default authSlice.reducer
