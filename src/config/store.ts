import { configureStore } from "@reduxjs/toolkit";
import { currentUserSlice } from "../store/currentUser";
import { admissionSlice } from "../store/admission";
import { historySlice } from "../store/history";

// Configuring redux store
const store = configureStore({
  reducer: {
    currentUser: currentUserSlice.reducer,
    newAdmission: admissionSlice.reducer,
    history: historySlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
