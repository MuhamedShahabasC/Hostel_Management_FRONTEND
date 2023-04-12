import { createSlice } from "@reduxjs/toolkit";
import { removeLocalData } from "../helpers/localStorage";

// Current slice
export const admissionSlice = createSlice({
  name: "AdmissionSlice",
  initialState: null,
  reducers: {
    update(state, action) {
      return action.payload;
    },
    complete(): null {
      removeLocalData();
      return null;
    },
  },
});

export const admissionActions = admissionSlice.actions;
