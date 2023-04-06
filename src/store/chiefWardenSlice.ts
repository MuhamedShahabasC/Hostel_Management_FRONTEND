import { createSlice } from "@reduxjs/toolkit";

// Chief warden slice
export const chiefWardenSlice = createSlice({
  name: "ChiefWardenSlice",
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

export const chiefWardenActions = chiefWardenSlice.actions;
