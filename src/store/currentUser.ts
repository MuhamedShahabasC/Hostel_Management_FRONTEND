import { createSlice } from "@reduxjs/toolkit";
import { removeLocalData } from "../utils/localStorage";

// Current slice
export const currentUserSlice = createSlice({
  name: "CurrentUserSlice",
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    updateProfilePic(state: any, action) {
      state.currentUser.profilePic = action.payload;
    },
    logout() {
      removeLocalData();
      return null;
    },
  },
});

export const currentUserActions = currentUserSlice.actions;
