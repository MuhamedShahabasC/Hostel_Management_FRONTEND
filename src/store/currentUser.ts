import { createSlice } from "@reduxjs/toolkit";
import { removeLocalData } from "../helpers/localStorage";

// Current slice
export const currentUserSlice = createSlice({
  name: "CurrentUserSlice",
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(): null {
      removeLocalData();
      return null;
    },
  },
});

export const currentUserActions = currentUserSlice.actions;
