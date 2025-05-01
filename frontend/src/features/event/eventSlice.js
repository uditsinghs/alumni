import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
  },
  reducers: {
    setEventSlice: (state, action) => {
      state.events = action.payload;
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter(event => event._id !== action.payload);
    },
    createEventSlice: (state, action) => {
      state.events = [action.payload,...state.events ]
    },
    editEvent: (state, action) => {
      state.events = [action.payload,...state.events ]
    }
  }
})

export const { setEventSlice, removeEvent,createEventSlice,editEvent } = eventSlice.actions;
export default eventSlice.reducer