import { createSlice } from "@reduxjs/toolkit";

// Staff slice
export const staffSlice = createSlice({
  name: "StaffSlice",
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(): null {
      return null;
    },
  },
});

export const staffActions = staffSlice.actions;
