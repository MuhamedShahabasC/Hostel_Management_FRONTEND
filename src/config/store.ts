import { configureStore } from "@reduxjs/toolkit";
import { staffSlice } from "../store/staffSlice";
import { chiefWardenSlice } from "../store/chiefWardenSlice";

// Configuring redux store
const store = configureStore({
  reducer: {
    staff: staffSlice.reducer,
    chiefWarden: chiefWardenSlice.reducer,
  },
});

export default store;
