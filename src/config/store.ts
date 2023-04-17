import { configureStore } from "@reduxjs/toolkit";
import { currentUserSlice } from "../store/currentUser";
import { admissionSlice } from "../store/admission";

// Configuring redux store
const store = configureStore({
  reducer: {
    currentUser: currentUserSlice.reducer,
    newAdmission: admissionSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
