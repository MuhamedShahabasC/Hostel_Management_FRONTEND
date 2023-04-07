import { createSlice } from "@reduxjs/toolkit";

// Current slice
export const currentUserSlice = createSlice({
  name: "CurrentUserSlice",
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

export const currentUserActions = currentUserSlice.actions;
