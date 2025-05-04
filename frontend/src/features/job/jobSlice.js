import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  myJobs: [],
}

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload
    },
    setMyJobs: (state, action) => {
      state.myJobs = action.payload
    },

  }
})
export const { setJobs,setMyJobs } = jobSlice.actions;
export default jobSlice.reducer;